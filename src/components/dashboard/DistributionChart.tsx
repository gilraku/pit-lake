'use client';

import { PitSite, Rating } from '@/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DistributionChartProps {
  pits: PitSite[];
}

const RATINGS: Rating[] = ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'];
const COLORS: Record<Rating, string> = {
  'Excellent': 'var(--sc-exc)',
  'Good':      'var(--sc-good)',
  'Fair':      'var(--sc-fair)',
  'Poor':      'var(--sc-poor)',
  'Very Poor': 'var(--sc-vp)',
};

export default function DistributionChart({ pits }: DistributionChartProps) {
  const data = RATINGS.map(r => ({
    rating: r,
    count: pits.filter(p => p.rating === r).length,
    color: COLORS[r],
  }));

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 22px',
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
        Rating Distribution
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} barSize={32}>
          <XAxis dataKey="rating" tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} width={24} />
          <Tooltip
            cursor={{ fill: 'var(--line)' }}
            contentStyle={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 6, fontSize: 12 }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
