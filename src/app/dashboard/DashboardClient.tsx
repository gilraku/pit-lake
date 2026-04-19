'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePitStore } from '@/store/usePitStore';
import { pitRepository } from '@/lib/repositories';
import { SEED_PITS } from '@/lib/seed';
import TopBar from '@/components/layout/TopBar';
import HeroCard from '@/components/dashboard/HeroCard';
import KpiStrip from '@/components/dashboard/KpiStrip';
import RankedList from '@/components/dashboard/RankedList';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import EmptyState from '@/components/ui/EmptyState';

const DistributionChart = dynamic(() => import('@/components/dashboard/DistributionChart'), {
  ssr: false,
  loading: () => <div style={{ height: 200, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }} />,
});

export default function DashboardClient() {
  const { pits, isLoading, loadPits } = usePitStore();

  useEffect(() => {
    async function init() {
      const existing = await pitRepository.getAll();
      // Re-seed if data is old (no real coordinates) or empty
      const FAKE_COMPANIES = ['PT Bumi Hijau', 'PT Hijau Lestari', 'PT Bara Energi', 'PT Energi Selatan', 'PT Sumatra Coal'];
      const needsReseed = existing.length === 0 ||
        existing.some(p => FAKE_COMPANIES.includes(p.companyName));
      if (needsReseed) {
        for (const old of existing) await pitRepository.delete(old.id);
        for (const pit of SEED_PITS) await pitRepository.save(pit);
      }
      await loadPits();
    }
    init();
  }, [loadPits]);

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <TopBar title="Dashboard" subtitle={`${pits.length} sites`} />
      <main className="page-main" style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
        {pits.length === 0 ? (
          <EmptyState
            title="No sites yet"
            description="Start by creating your first pit lake assessment."
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
          <>
            <HeroCard pits={pits} />
            <KpiStrip pits={pits} />
            <div className="dashboard-bottom">
              <RankedList pits={pits} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <DistributionChart pits={pits} />
                <ActivityFeed pits={pits} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
