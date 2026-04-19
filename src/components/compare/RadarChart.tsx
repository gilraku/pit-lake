'use client';

import { PitSite } from '@/types';
import { FRAMEWORK } from '@/lib/framework';
import {
  RadarChart as ReRadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip,
} from 'recharts';

const SERIES_COLORS = ['#1F3A2E', '#B8541F', '#3B72A3', '#7A4FA8'];

interface RadarChartProps {
  pits: PitSite[];
}

export default function RadarChart({ pits }: RadarChartProps) {
  const data = FRAMEWORK.map(cat => {
    const point: Record<string, string | number> = { category: cat.label };
    pits.forEach(pit => {
      point[pit.pitName] = pit.catScores[cat.key] ?? 0;
    });
    return point;
  });

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)', padding: '20px 22px',
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
        Category Comparison
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ReRadarChart data={data}>
          <PolarGrid stroke="var(--line)" />
          <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: 'var(--muted)' }} />
          <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10, fill: 'var(--faint)' }} tickCount={6} />
          <Tooltip
            contentStyle={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 6, fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {pits.map((pit, i) => (
            <Radar
              key={pit.id}
              name={pit.pitName}
              dataKey={pit.pitName}
              stroke={SERIES_COLORS[i]}
              fill={SERIES_COLORS[i]}
              fillOpacity={0.08}
              strokeWidth={2}
            />
          ))}
        </ReRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
