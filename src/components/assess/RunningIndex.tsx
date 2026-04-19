'use client';

import { RawScores } from '@/types';
import { calculate } from '@/lib/scoring';
import { pctColor } from '@/lib/scoring';

interface RunningIndexProps {
  scores: RawScores;
}

export default function RunningIndex({ scores }: RunningIndexProps) {
  const { finalScore, rating, catScores } = calculate(scores);
  const filledCount = Object.values(scores).reduce((total, cat) => {
    if (!cat) return total;
    return total + Object.values(cat).filter(v => v !== undefined).length;
  }, 0);

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      position: 'sticky',
      top: 24,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
        Running Index
      </div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 56,
        color: 'var(--primary)', lineHeight: 1, marginBottom: 6,
      }}>
        {finalScore}
      </div>
      <div style={{ height: 6, background: 'var(--line)', borderRadius: 3, marginBottom: 10, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 3,
          width: `${finalScore}%`,
          background: pctColor(finalScore),
          transition: 'width 0.3s ease',
        }} />
      </div>
      <div style={{ fontSize: 12, color: pctColor(finalScore), fontWeight: 600, marginBottom: 16 }}>
        {rating}
      </div>

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>
          {filledCount} of 21 indicators filled
        </div>
        {Object.entries(catScores).map(([key, score]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 60, height: 3, background: 'var(--line)', borderRadius: 2, overflow: 'hidden', flex: 1 }}>
              <div style={{
                height: '100%', borderRadius: 2,
                width: `${score / 5 * 100}%`,
                background: score > 0 ? 'var(--primary)' : 'var(--line)',
                transition: 'width 0.3s ease',
              }} />
            </div>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)', minWidth: 24 }}>
              {score > 0 ? score.toFixed(1) : '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
