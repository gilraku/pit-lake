'use client';

import { PitSite } from '@/types';
import Chip from '@/components/ui/Chip';
import { pctColor } from '@/lib/scoring';

interface KpiStripProps {
  pits: PitSite[];
}

export default function KpiStrip({ pits }: KpiStripProps) {
  if (pits.length === 0) return null;

  const avgScore = Math.round(pits.reduce((s, p) => s + p.finalScore, 0) / pits.length);
  const best = pits.reduce((a, b) => a.finalScore > b.finalScore ? a : b);
  const worst = pits.reduce((a, b) => a.finalScore < b.finalScore ? a : b);

  const ratingCounts: Record<string, number> = {};
  pits.forEach(p => { ratingCounts[p.rating] = (ratingCounts[p.rating] ?? 0) + 1; });
  const topRating = Object.entries(ratingCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  const kpis = [
    { label: 'Total Sites',      value: pits.length,       sub: 'assessed' },
    { label: 'Avg Index',        value: avgScore,          sub: topRating, isRating: true },
    { label: 'Best Performer',   value: best.pitName,      sub: best.finalScore + ' pts', isName: true },
    { label: 'Needs Attention',  value: worst.pitName,     sub: worst.finalScore + ' pts', isName: true, isWorst: true },
  ];

  return (
    <div className="kpi-grid">
      {kpis.map((k, i) => (
        <div key={i} style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 22px',
        }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
            {k.label}
          </div>
          <div style={{
            fontFamily: k.isName ? 'var(--font-geist)' : 'var(--font-serif)',
            fontStyle: k.isName ? 'normal' : 'italic',
            fontSize: k.isName ? 16 : 36,
            fontWeight: k.isName ? 600 : 400,
            color: k.isWorst ? 'var(--sc-poor)' : 'var(--ink)',
            lineHeight: 1.1,
            marginBottom: 6,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {typeof k.value === 'number'
              ? <span style={{ color: pctColor(k.value) }}>{k.value}</span>
              : k.value}
          </div>
          {k.isRating && k.sub ? (
            <Chip rating={k.sub as PitSite['rating']} size="sm" />
          ) : (
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{k.sub}</div>
          )}
        </div>
      ))}
    </div>
  );
}
