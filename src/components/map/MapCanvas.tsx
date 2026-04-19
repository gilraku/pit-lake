'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { PitSite } from '@/types';
import { pctColor } from '@/lib/scoring';

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const DEFAULT_CENTER: [number, number] = [-1.5, 116.5];
const DEFAULT_ZOOM = 6;

interface MapCanvasProps {
  pits: PitSite[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MapCanvas({ pits, selectedId, onSelect }: MapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);
  const markersRef = useRef<Map<string, import('leaflet').CircleMarker>>(new Map());

  // Init map once
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    import('leaflet').then(L => {
      if (cancelled || !containerRef.current) return;
      if ((containerRef.current as HTMLElement & { _leaflet_id?: number })._leaflet_id) return;

      const map = L.map(containerRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });
      L.tileLayer(TILE_URL, { attribution: ATTRIBUTION }).addTo(map);
      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  // Sync markers whenever pits changes (handles async data load)
  useEffect(() => {
    if (!mapRef.current || pits.length === 0) return;

    // Wait a tick in case map just initialized
    const timer = setTimeout(() => {
      import('leaflet').then(L => {
        if (!mapRef.current) return;

        // Remove stale markers
        markersRef.current.forEach(m => m.remove());
        markersRef.current.clear();

        pits.forEach(pit => {
          if (!pit.locationCoordinate) return;
          const [lat, lng] = pit.locationCoordinate.split(',').map(Number);
          if (isNaN(lat) || isNaN(lng)) return;

          const marker = L.circleMarker([lat, lng], {
            radius: 11,
            fillColor: pctColor(pit.finalScore),
            fillOpacity: 0.9,
            color: '#fff',
            weight: 2,
          }).addTo(mapRef.current!);

          marker.bindTooltip(
            `<b>${pit.pitName}</b><br>${pit.companyName}<br>${pit.rating} · ${pit.finalScore}/100`,
            { permanent: false, direction: 'top', offset: [0, -8] }
          );
          marker.on('click', () => onSelect(pit.id));
          markersRef.current.set(pit.id, marker);
        });
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [pits, onSelect]);

  // Pan to selected marker
  useEffect(() => {
    if (!selectedId || !mapRef.current) return;
    const pit = pits.find(p => p.id === selectedId);
    if (!pit?.locationCoordinate) return;
    const [lat, lng] = pit.locationCoordinate.split(',').map(Number);
    if (isNaN(lat) || isNaN(lng)) return;
    mapRef.current.setView([lat, lng], 11, { animate: true });

    // Open tooltip on selected marker
    const marker = markersRef.current.get(selectedId);
    marker?.openTooltip();
  }, [selectedId, pits]);

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
    />
  );
}
