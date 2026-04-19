'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePitStore } from '@/store/usePitStore';
import TopBar from '@/components/layout/TopBar';
import Chip from '@/components/ui/Chip';
import EmptyState from '@/components/ui/EmptyState';
import Link from 'next/link';

const RadarChart = dynamic(() => import('@/components/compare/RadarChart'), {
  ssr: false,
  loading: () => <div style={{ height: 440, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }} />,
});
const CompareTable = dynamic(() => import('@/components/compare/CompareTable'), { ssr: false });

export default function CompareClient() {
  const { pits, compareSel, toggleCompare, clearCompare, loadPits } = usePitStore();

  useEffect(() => { loadPits(); }, [loadPits]);

  const selected = pits.filter(p => compareSel.includes(p.id));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <TopBar title="Compare Sites" subtitle={`${compareSel.length}/4 selected`} />
      <main style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)', padding: '16px 20px',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>
            Select sites to compare (max 4)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {pits.map(pit => {
              const sel = compareSel.includes(pit.id);
              return (
                <button
                  key={pit.id}
                  onClick={() => toggleCompare(pit.id)}
                  style={{
                    padding: '7px 14px', borderRadius: 'var(--radius)',
                    border: sel ? '1px solid var(--primary)' : '1px solid var(--line)',
                    background: sel ? 'color-mix(in oklab, var(--primary) 10%, var(--surface))' : 'var(--surface-2)',
                    cursor: !sel && compareSel.length >= 4 ? 'not-allowed' : 'pointer',
                    opacity: !sel && compareSel.length >= 4 ? 0.5 : 1,
                    color: sel ? 'var(--primary)' : 'var(--ink)',
                    fontSize: 13, fontWeight: sel ? 600 : 400,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  {pit.pitName}
                  <Chip rating={pit.rating} size="sm" />
                </button>
              );
            })}
            {pits.length === 0 && (
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>No sites yet.</span>
            )}
          </div>
          {compareSel.length > 0 && (
            <button
              onClick={clearCompare}
              style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Clear selection
            </button>
          )}
        </div>

        {selected.length < 2 ? (
          <EmptyState
            title="Select at least 2 sites"
            description="Choose sites from the list above to start comparing."
          />
        ) : (
          <>
            <RadarChart pits={selected} />
            <CompareTable pits={selected} />
          </>
        )}
      </main>
    </div>
  );
}
