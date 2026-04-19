'use client';

import Link from 'next/link';
import { PitSite } from '@/types';
import Chip from '@/components/ui/Chip';
import { pctColor } from '@/lib/scoring';

interface RankedListProps {
  pits: PitSite[];
}

export default function RankedList({ pits }: RankedListProps) {
  const sorted = [...pits].sort((a, b) => b.finalScore - a.finalScore);
  const top6 = sorted.slice(0, 6);
  const rest = sorted.length - 6;

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Site Rankings</div>
      </div>

      {top6.map((pit, i) => (
        <Link key={pit.id} href={`/sites/${pit.id}`} style={{
          display: 'grid',
          gridTemplateColumns: '28px 1fr auto auto',
          alignItems: 'center',
          gap: 12,
          padding: '13px 22px',
          borderBottom: '1px solid var(--line)',
          textDecoration: 'none',
          color: 'inherit',
        }}>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--faint)', fontWeight: 600 }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{pit.pitName}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{pit.companyName}</div>
          </div>
          <Chip rating={pit.rating} size="sm" />
          <div style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22,
            color: pctColor(pit.finalScore), minWidth: 44, textAlign: 'right',
          }}>
            {pit.finalScore}
          </div>
        </Link>
      ))}

      {rest > 0 && (
        <Link href="/sites" style={{
          display: 'block', padding: '12px 22px', textAlign: 'center',
          fontSize: 13, color: 'var(--muted)', textDecoration: 'none',
        }}>
          +{rest} more sites →
        </Link>
      )}
    </div>
  );
}
