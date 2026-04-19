'use client';

import { PitSite } from '@/types';
import { pctColor, scoreColor } from '@/lib/scoring';
import { FRAMEWORK } from '@/lib/framework';
import Chip from '@/components/ui/Chip';

interface GaugeCardProps {
  pit: PitSite;
}

export default function GaugeCard({ pit }: GaugeCardProps) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 32px',
    }}>
      <div className="gauge-inner">
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Final Score
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 100,
            color: pctColor(pit.finalScore), lineHeight: 1,
          }}>
            {pit.finalScore}
          </div>
          <div style={{ marginTop: 8 }}>
            <Chip rating={pit.rating} />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
              Category Contribution
            </div>
            <svg viewBox="0 0 280 20" width="100%" style={{ display: 'block', borderRadius: 4, overflow: 'hidden' }}>
              {(() => {
                let x = 0;
                return FRAMEWORK.map(cat => {
                  const catScore = pit.catScores[cat.key] ?? 0;
                  const w = (catScore / 5) * cat.weight * 280;
                  const rect = (
                    <rect key={cat.key} x={x} y={0} width={w} height={20} fill={scoreColor(catScore)} />
                  );
                  x += w;
                  return rect;
                });
              })()}
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FRAMEWORK.map(cat => {
              const catScore = pit.catScores[cat.key] ?? 0;
              return (
                <div key={cat.key} style={{
                  display: 'grid', gridTemplateColumns: '160px 80px 36px',
                  alignItems: 'center', gap: 12,
                }}>
                  <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{cat.label}</div>
                  <div style={{ height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      width: `${catScore / 5 * 100}%`,
                      background: scoreColor(catScore),
                    }} />
                  </div>
                  <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)', textAlign: 'right' }}>
                    {catScore.toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
