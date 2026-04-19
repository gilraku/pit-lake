'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePitStore } from '@/store/usePitStore';
import TopBar from '@/components/layout/TopBar';
import Chip from '@/components/ui/Chip';
import EmptyState from '@/components/ui/EmptyState';

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
      <TopBar title="Compare" subtitle={`${compareSel.length}/4 selected`} />
      <main className="page-main" style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
              Select sites to compare <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(max 4)</span>
            </span>
            {compareSel.length > 0 && (
              <button onClick={clearCompare} style={{ fontSize: 12, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                Clear
              </button>
            )}
          </div>

          {pits.length === 0 ? (
            <div style={{ padding: '16px', fontSize: 13, color: 'var(--muted)' }}>No sites yet.</div>
          ) : (
            pits.map(pit => {
              const sel = compareSel.includes(pit.id);
              const disabled = !sel && compareSel.length >= 4;
              return (
                <button
                  key={pit.id}
                  onClick={() => !disabled && toggleCompare(pit.id)}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--line)',
                    border: 'none',
                    borderLeft: sel ? '3px solid var(--primary)' : '3px solid transparent',
                    background: sel ? 'color-mix(in oklab, var(--primary) 6%, var(--surface))' : 'var(--surface)',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.4 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: sel ? 600 : 400, color: sel ? 'var(--primary)' : 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pit.pitName}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{pit.companyName}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <Chip rating={pit.rating} size="sm" />
                    <span style={{ fontSize: 12, color: sel ? 'var(--primary)' : 'var(--faint)', fontWeight: 600 }}>
                      {sel ? '✓' : '+'}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {selected.length < 2 ? (
          <EmptyState
            title="Select at least 2 sites"
            description="Pilih site dari daftar di atas untuk membandingkan."
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
