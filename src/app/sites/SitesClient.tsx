'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePitStore } from '@/store/usePitStore';
import TopBar from '@/components/layout/TopBar';
import Chip from '@/components/ui/Chip';
import EmptyState from '@/components/ui/EmptyState';
import { pctColor } from '@/lib/scoring';

export default function SitesClient() {
  const { pits, isLoading, loadPits } = usePitStore();

  useEffect(() => { loadPits(); }, [loadPits]);

  const sorted = [...pits].sort((a, b) => b.finalScore - a.finalScore);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <TopBar title="All Sites" subtitle={`${pits.length} sites`} />
      <main style={{ padding: '28px 32px', flex: 1 }}>
        {isLoading ? (
          <div style={{ color: 'var(--muted)', textAlign: 'center', padding: 48 }}>Loading…</div>
        ) : pits.length === 0 ? (
          <EmptyState
            title="No sites assessed yet"
            description="Create your first pit lake assessment to get started."
            action={
              <Link href="/assess/new" style={{
                display: 'inline-block', padding: '9px 20px',
                background: 'var(--primary)', color: 'var(--primary-ink)',
                borderRadius: 'var(--radius)', textDecoration: 'none', fontSize: 13, fontWeight: 600,
              }}>
                + New Assessment
              </Link>
            }
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {sorted.map(pit => (
              <Link key={pit.id} href={`/sites/${pit.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-lg)', padding: '20px 22px',
                  transition: 'border-color 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{pit.pitName}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{pit.companyName}</div>
                    </div>
                    <Chip rating={pit.rating} size="sm" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{
                      fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 44,
                      color: pctColor(pit.finalScore), lineHeight: 1,
                    }}>
                      {pit.finalScore}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>/ 100</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>{pit.regency}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
