'use client';

import { PitSite } from '@/types';
import { FRAMEWORK } from '@/lib/framework';
import { scoreColor } from '@/lib/scoring';

interface CategoryBreakdownProps {
  pit: PitSite;
}

export default function CategoryBreakdown({ pit }: CategoryBreakdownProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {FRAMEWORK.map(cat => {
        const catScore = pit.catScores[cat.key] ?? 0;
        const catRaw = pit.scores[cat.key as keyof typeof pit.scores] as Record<string, number | undefined> | undefined;

        return (
          <div key={cat.key} style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--line)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--paper)',
            }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{cat.label}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {cat.parent}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 60, height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: scoreColor(catScore), width: `${catScore / 5 * 100}%`, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                  {catScore.toFixed(1)}
                </span>
              </div>
            </div>

            <div style={{ padding: '4px 0' }}>
              {cat.indicators.map(ind => {
                const v = catRaw?.[ind.key];
                return (
                  <div key={ind.key} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto 160px',
                    alignItems: 'center', gap: 12, padding: '10px 20px',
                    borderBottom: '1px solid var(--line)',
                  }}>
                    <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{ind.label}</div>
                    <div style={{
                      fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20,
                      color: v ? scoreColor(v) : 'var(--faint)',
                    }}>
                      {v ?? '—'}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                      {v ? ind.criteria[v - 1] : 'Not assessed'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
