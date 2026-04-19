'use client';

import { PitSite } from '@/types';
import { scoreColor } from '@/lib/scoring';
import { FRAMEWORK } from '@/lib/framework';

interface HeroCardProps {
  pits: PitSite[];
}

const PARENT_GROUPS = [
  { key: 'Environmental', cats: ['catchmentCondition', 'waterQuality', 'pitLakeStability', 'hydrology'] },
  { key: 'Economic',      cats: ['economicBenefits'] },
  { key: 'Community',     cats: ['community'] },
  { key: 'Government',    cats: ['government'] },
];

export default function HeroCard({ pits }: HeroCardProps) {
  if (pits.length === 0) return null;

  const avgScore = Math.round(pits.reduce((s, p) => s + p.finalScore, 0) / pits.length);
  const scoreStr = String(avgScore);

  const catAvgs: Record<string, number> = {};
  FRAMEWORK.forEach(cat => {
    catAvgs[cat.key] = pits.reduce((s, p) => s + (p.catScores[cat.key] ?? 0), 0) / pits.length;
  });

  const groupAvgs = PARENT_GROUPS.map(g => {
    const cats = FRAMEWORK.filter(f => g.cats.includes(f.key));
    const totalWeight = cats.reduce((s, c) => s + c.weight, 0);
    const weightedSum = cats.reduce((s, c) => s + catAvgs[c.key] * c.weight, 0);
    return { key: g.key, avg: totalWeight ? weightedSum / totalWeight : 0 };
  });

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--line)',
      padding: '32px 36px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 80% 20%, var(--accent-soft) 0%, transparent 50%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(38deg, transparent 0 18px, var(--topo-line) 18px 19px)',
      }} />

      <div style={{ position: 'relative', display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Portfolio Average
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', lineHeight: 1, fontSize: 120 }}>
            <span style={{ color: 'var(--primary)' }}>{scoreStr[0]}</span>
            <span style={{ color: 'var(--ink)' }}>{scoreStr.slice(1)}</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            {pits.length} site{pits.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="hero-breakdown-col">
          {groupAvgs.map(g => (
            <div key={g.key} style={{
              display: 'grid', gridTemplateColumns: '140px 1fr 44px',
              alignItems: 'center', gap: 12, marginBottom: 12,
            }}>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>{g.key}</div>
              <div style={{ height: 6, background: 'var(--line)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 3,
                  width: `${g.avg / 5 * 100}%`,
                  background: scoreColor(g.avg),
                  transition: 'width 0.4s ease',
                }} />
              </div>
              <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--muted)', textAlign: 'right' }}>
                {g.avg.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
