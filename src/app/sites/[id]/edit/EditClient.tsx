'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { usePitStore } from '@/store/usePitStore';
import { pitRepository } from '@/lib/repositories';
import { FRAMEWORK } from '@/lib/framework';
import { calculate } from '@/lib/scoring';
import { RawScores, PitSite } from '@/types';
import TopBar from '@/components/layout/TopBar';
import StepsSidebar from '@/components/assess/StepsSidebar';
import IndicatorCard from '@/components/assess/IndicatorCard';
import RunningIndex from '@/components/assess/RunningIndex';

interface Props {
  paramsPromise: Promise<{ id: string }>;
}

export default function EditClient({ paramsPromise }: Props) {
  const { id } = use(paramsPromise);
  const router = useRouter();
  const { savePit } = usePitStore();

  const [pit, setPit] = useState<PitSite | null>(null);
  const [scores, setScores] = useState<RawScores>({});
  const [step, setStep] = useState(0);

  useEffect(() => {
    pitRepository.getById(id).then(p => {
      if (!p) return;
      setPit(p);
      setScores(p.scores);
    });
  }, [id]);

  function setIndicator(catKey: string, indKey: string, v: number) {
    setScores(prev => ({
      ...prev,
      [catKey]: { ...(prev[catKey as keyof RawScores] as object | undefined), [indKey]: v },
    }));
  }

  async function handleSave() {
    if (!pit) return;
    const { catScores, finalScore, finalRaw, rating } = calculate(scores);
    const updated: PitSite = {
      ...pit,
      scores,
      catScores,
      finalScore,
      finalRaw,
      rating,
      updatedAt: new Date().toISOString(),
    };
    await savePit(updated);
    router.push(`/sites/${pit.id}`);
  }

  if (!pit) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
        Loading…
      </div>
    );
  }

  const cat = FRAMEWORK[step];
  const catRaw = scores[cat.key as keyof RawScores] as Record<string, number | undefined> | undefined;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar title={`Edit — ${pit.pitName}`} subtitle={`Step ${step + 1} of 7 — ${cat.label}`} />

      <div className="wizard-layout">
        <div className="wizard-steps">
          <StepsSidebar currentStep={step} scores={scores} onStepClick={setStep} />
        </div>

        <div className="wizard-content">
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 20 }}>{cat.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cat.indicators.map(ind => (
                <IndicatorCard
                  key={ind.key}
                  indicator={ind}
                  value={catRaw?.[ind.key]}
                  onChange={v => setIndicator(cat.key, ind.key, v)}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                style={{
                  padding: '9px 22px', borderRadius: 'var(--radius)',
                  background: 'var(--paper-2)', border: '1px solid var(--line)',
                  cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1,
                  fontSize: 13, fontWeight: 500, color: 'var(--ink)',
                }}
              >
                ← Previous
              </button>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '9px 22px', borderRadius: 'var(--radius)',
                    background: 'var(--paper-2)', border: '1px solid var(--line)',
                    cursor: 'pointer', fontSize: 13, fontWeight: 500, color: 'var(--ink)',
                  }}
                >
                  Save Changes
                </button>
                {step < FRAMEWORK.length - 1 && (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    style={{
                      padding: '9px 22px', borderRadius: 'var(--radius)',
                      background: 'var(--primary)', color: 'var(--primary-ink)',
                      border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    }}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="wizard-running-index">
            <RunningIndex scores={scores} />
          </div>
        </div>
      </div>
    </div>
  );
}
