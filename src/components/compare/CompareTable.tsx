'use client';

import { PitSite } from '@/types';
import { FRAMEWORK } from '@/lib/framework';
import Chip from '@/components/ui/Chip';
import { pctColor } from '@/lib/scoring';

interface CompareTableProps {
  pits: PitSite[];
}

export default function CompareTable({ pits }: CompareTableProps) {
  if (pits.length === 0) return null;

  interface Row {
    label: string;
    getValue: (p: PitSite) => string | number;
    isScore?: boolean;
    isRating?: boolean;
    isNumeric?: boolean;
    numVal?: (p: PitSite) => number;
  }

  const rows: Row[] = [
    { label: 'Final Score', getValue: (p) => p.finalScore, isScore: true, numVal: (p) => p.finalScore },
    { label: 'Rating', getValue: (p) => p.rating, isRating: true },
    ...FRAMEWORK.map(cat => ({
      label: cat.label,
      getValue: (p: PitSite) => (p.catScores[cat.key] ?? 0).toFixed(2),
      isNumeric: true,
      numVal: (p: PitSite) => p.catScores[cat.key] ?? 0,
    })),
  ];

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)', overflow: 'auto',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--muted)', width: 160 }}>
              Indicator
            </th>
            {pits.map(pit => (
              <th key={pit.id} style={{ padding: '12px 16px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--ink)', minWidth: 140 }}>
                {pit.pitName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const numVals = row.numVal ? pits.map(row.numVal) : null;
            const maxVal = numVals ? Math.max(...numVals) : null;
            const minVal = numVals ? Math.min(...numVals) : null;

            return (
              <tr key={ri} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '10px 16px', fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>
                  {row.label}
                </td>
                {pits.map(pit => {
                  const val = row.getValue(pit);
                  const numV = row.numVal ? row.numVal(pit) : null;
                  const isBest = numVals && numV !== null && numV === maxVal && maxVal !== minVal;
                  const isWorst = numVals && numV !== null && numV === minVal && maxVal !== minVal;

                  return (
                    <td key={pit.id} style={{
                      padding: '10px 16px', textAlign: 'center', fontSize: 13,
                      background: isBest ? 'color-mix(in oklab, var(--sc-good) 10%, var(--surface))' :
                                  isWorst ? 'color-mix(in oklab, var(--sc-poor) 10%, var(--surface))' :
                                  'transparent',
                    }}>
                      {row.isRating ? (
                        <Chip rating={val as PitSite['rating']} size="sm" />
                      ) : row.isScore ? (
                        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22, color: pctColor(val as number) }}>
                          {val}
                        </span>
                      ) : (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink)' }}>{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
