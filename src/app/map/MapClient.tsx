'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePitStore } from '@/store/usePitStore';
import { Rating } from '@/types';
import TopBar from '@/components/layout/TopBar';
import MapAside from '@/components/map/MapAside';

const MapCanvas = dynamic(() => import('@/components/map/MapCanvas'), { ssr: false });

export default function MapClient() {
  const { pits, loadPits } = usePitStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterRating, setFilterRating] = useState<Rating | null>(null);

  useEffect(() => { loadPits(); }, [loadPits]);

  const filtered = pits.filter(p => {
    if (filterRating && p.rating !== filterRating) return false;
    if (search && !p.pitName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar title="Map" subtitle={`${pits.filter(p => p.locationCoordinate).length} sites with coords`} />
      <div className="map-layout">
        <div style={{ padding: 16, background: 'var(--paper-2)' }}>
          <MapCanvas
            pits={pits.filter(p => p.locationCoordinate)}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <MapAside
          pits={filtered}
          allPits={pits}
          selectedId={selectedId}
          onSelect={setSelectedId}
          search={search}
          onSearch={setSearch}
          filterRating={filterRating}
          onFilterRating={setFilterRating}
        />
      </div>
    </div>
  );
}
