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
  const [asideOpen, setAsideOpen] = useState(false);

  useEffect(() => { loadPits(); }, [loadPits]);

  const filtered = pits.filter(p => {
    if (filterRating && p.rating !== filterRating) return false;
    if (search && !p.pitName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function handleSelect(id: string) {
    setSelectedId(id);
    setAsideOpen(false);
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar title="Map" subtitle={`${pits.filter(p => p.locationCoordinate).length} sites`} />
      <div className="map-layout">
        <div className="map-canvas-wrap" style={{ padding: 12, background: 'var(--paper-2)', overflow: 'hidden' }}>
          <MapCanvas
            pits={pits.filter(p => p.locationCoordinate)}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>
        <MapAside
          className={`map-aside${asideOpen ? ' open' : ''}`}
          pits={filtered}
          allPits={pits}
          selectedId={selectedId}
          onSelect={handleSelect}
          search={search}
          onSearch={setSearch}
          filterRating={filterRating}
          onFilterRating={setFilterRating}
        />
      </div>

      {/* Mobile toggle button */}
      <button
        className="map-aside-mobile-toggle"
        onClick={() => setAsideOpen(o => !o)}
      >
        {asideOpen ? '✕ Close' : `⊞ Sites (${filtered.length})`}
      </button>
    </div>
  );
}
