'use client';

import Link from 'next/link';
import { PitSite } from '@/types';
import Chip from '@/components/ui/Chip';

interface ActivityFeedProps {
  pits: PitSite[];
}

export default function ActivityFeed({ pits }: ActivityFeedProps) {
  const recent = [...pits].sort((a, b) =>
    new Date(b.assessedAt).getTime() - new Date(a.assessedAt).getTime()
  ).slice(0, 3);

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Recent Assessments</div>
      </div>
      {recent.map(pit => (
        <Link key={pit.id} href={`/sites/${pit.id}`} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '13px 22px',
          borderBottom: '1px solid var(--line)',
          textDecoration: 'none', color: 'inherit',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{pit.pitName}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {new Date(pit.assessedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
          <Chip rating={pit.rating} size="sm" />
        </Link>
      ))}
    </div>
  );
}
