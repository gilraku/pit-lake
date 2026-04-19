'use client';

import { FRAMEWORK } from '@/lib/framework';
import { RawScores } from '@/types';

interface StepsSidebarProps {
  currentStep: number;
  scores: RawScores;
  onStepClick: (i: number) => void;
}

export default function StepsSidebar({ currentStep, scores, onStepClick }: StepsSidebarProps) {
  return (
    <div style={{
      width: 200, flexShrink: 0,
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, padding: '0 4px' }}>
        Categories
      </div>
      {FRAMEWORK.map((cat, i) => {
        const catRaw = scores[cat.key as keyof RawScores] as Record<string, number | undefined> | undefined;
        const filled = catRaw ? Object.values(catRaw).filter(v => v !== undefined).length : 0;
        const total = cat.indicators.length;
        const complete = filled === total;
        const active = currentStep === i;

        return (
          <button
            key={cat.key}
            onClick={() => onStepClick(i)}
            style={{
              textAlign: 'left', padding: '9px 12px', borderRadius: 'var(--radius)',
              border: 'none', cursor: 'pointer',
              background: active ? 'color-mix(in oklab, var(--primary) 8%, var(--surface))' : 'transparent',
              color: active ? 'var(--primary)' : 'var(--ink-2)',
              fontWeight: active ? 600 : 400,
              fontSize: 13,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{cat.label}</span>
              {complete && <span style={{ color: 'var(--sc-good)', fontSize: 12 }}>✓</span>}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
              {filled}/{total}
            </div>
          </button>
        );
      })}
    </div>
  );
}
