'use client';

import { Indicator } from '@/lib/framework';

interface IndicatorCardProps {
  indicator: Indicator;
  value: number | undefined;
  onChange: (v: number) => void;
}

export default function IndicatorCard({ indicator, value, onChange }: IndicatorCardProps) {
  return (
    <div style={{
      border: value ? '1px solid var(--line)' : '1px dashed var(--line)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      background: 'var(--surface)',
    }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 14 }}>
        {indicator.label}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
        {indicator.criteria.map((label, i) => {
          const score = i + 1;
          const active = value === score;
          return (
            <button
              key={score}
              onClick={() => onChange(score)}
              style={{
                border: active ? 'none' : '1px solid var(--line)',
                borderRadius: 10,
                padding: '14px 10px',
                cursor: 'pointer',
                textAlign: 'center',
                background: active ? 'var(--ink)' : 'var(--surface-2)',
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20,
                color: active ? 'var(--paper)' : 'var(--muted)',
                marginBottom: 6, lineHeight: 1,
              }}>
                {score}
              </div>
              <div style={{ fontSize: 11, color: active ? 'var(--paper)' : 'var(--muted)', lineHeight: 1.4 }}>
                {label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
