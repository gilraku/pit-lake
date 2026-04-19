'use client';

import { PitSite, Rating } from '@/types';
import Chip from '@/components/ui/Chip';
import { pctColor } from '@/lib/scoring';

interface MapAsideProps {
  pits: PitSite[];
  allPits: PitSite[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearch: (v: string) => void;
  filterRating: Rating | null;
  onFilterRating: (r: Rating | null) => void;
  className?: string;
}

const RATINGS: Rating[] = ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'];

export default function MapAside({ pits, allPits, selectedId, onSelect, search, onSearch, filterRating, onFilterRating, className }: MapAsideProps) {
  const noCoords = allPits.filter(p => !p.locationCoordinate).length;

  return (
    <aside className={className} style={{
      width: 300, borderLeft: '1px solid var(--line)',
      background: 'var(--surface)', display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 16px 0' }}>
        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search sites…"
          style={{
            width: '100%', padding: '8px 12px', borderRadius: 'var(--radius)',
            border: '1px solid var(--line)', background: 'var(--surface-2)',
            color: 'var(--ink)', fontSize: 13, outline: 'none', marginBottom: 10,
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {RATINGS.map(r => (
            <button
              key={r}
              onClick={() => onFilterRating(filterRating === r ? null : r)}
              style={{
                padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                border: 'none', cursor: 'pointer',
                background: filterRating === r ? 'var(--primary)' : 'var(--paper-2)',
                color: filterRating === r ? 'var(--primary-ink)' : 'var(--muted)',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {pits.map(pit => (
          <button
            key={pit.id}
            onClick={() => onSelect(pit.id)}
            style={{
              width: '100%', textAlign: 'left', padding: '12px 16px',
              borderBottom: '1px solid var(--line)', border: 'none',
              background: selectedId === pit.id
                ? 'color-mix(in oklab, var(--primary) 8%, var(--surface))'
                : 'transparent',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{pit.pitName}</div>
              <span style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18,
                color: pctColor(pit.finalScore),
              }}>
                {pit.finalScore}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <Chip rating={pit.rating} size="sm" />
              {!pit.locationCoordinate && (
                <span style={{ fontSize: 11, color: 'var(--faint)' }}>no coords</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {noCoords > 0 && (
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--line)', fontSize: 12, color: 'var(--muted)' }}>
          {noCoords} site{noCoords !== 1 ? 's' : ''} without coordinates (not shown on map)
        </div>
      )}
    </aside>
  );
}
