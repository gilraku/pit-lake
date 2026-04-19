'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { usePitStore } from '@/store/usePitStore';
import { FRAMEWORK } from '@/lib/framework';
import { calculate } from '@/lib/scoring';
import { RawScores, PitSite, PitDraft } from '@/types';
import TopBar from '@/components/layout/TopBar';
import StepsSidebar from '@/components/assess/StepsSidebar';
import IndicatorCard from '@/components/assess/IndicatorCard';
import RunningIndex from '@/components/assess/RunningIndex';

interface Identity {
  pitName: string;
  companyName: string;
  assessmentPeriod: string;
  regency: string;
  locationCoordinate: string;
  pitLakeAreaHa: string;
  catchmentAreaHa: string;
  sourceOfInflow: string;
  riverDownstream: string;
  villagesDownstream: string;
}

const EMPTY_IDENTITY: Identity = {
  pitName: '', companyName: '', assessmentPeriod: '', regency: '',
  locationCoordinate: '', pitLakeAreaHa: '', catchmentAreaHa: '',
  sourceOfInflow: '', riverDownstream: '', villagesDownstream: '',
};

export default function AssessClient() {
  const router = useRouter();
  const { savePit } = usePitStore();

  const [showModal, setShowModal] = useState(true);
  const [identity, setIdentity] = useState<Identity>(EMPTY_IDENTITY);
  const [scores, setScores] = useState<RawScores>({});
  const [step, setStep] = useState(0);

  const setIndicator = useCallback((catKey: string, indKey: string, v: number) => {
    setScores(prev => ({
      ...prev,
      [catKey]: { ...(prev[catKey as keyof RawScores] as object | undefined), [indKey]: v },
    }));
  }, []);

  async function handleSubmit() {
    const { catScores, finalScore, finalRaw, rating } = calculate(scores);
    const now = new Date().toISOString();
    const pit: PitSite = {
      id: uuidv4(),
      pitName: identity.pitName,
      companyName: identity.companyName,
      assessmentPeriod: identity.assessmentPeriod,
      regency: identity.regency,
      locationCoordinate: identity.locationCoordinate,
      pitLakeAreaHa: identity.pitLakeAreaHa ? parseFloat(identity.pitLakeAreaHa) : null,
      catchmentAreaHa: identity.catchmentAreaHa ? parseFloat(identity.catchmentAreaHa) : null,
      sourceOfInflow: identity.sourceOfInflow,
      riverDownstream: identity.riverDownstream,
      villagesDownstream: identity.villagesDownstream,
      scores,
      catScores,
      finalScore,
      finalRaw,
      rating,
      assessedAt: now,
      updatedAt: now,
    };
    await savePit(pit);
    router.push(`/sites/${pit.id}`);
  }

  const cat = FRAMEWORK[step];
  const catRaw = scores[cat.key as keyof RawScores] as Record<string, number | undefined> | undefined;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar title="New Assessment" subtitle={`Step ${step + 1} of 7 — ${cat.label}`} />

      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }}>
          <div style={{
            background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
            padding: '32px', width: 560, maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
              Site Identity
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>
              Fill in the basic information about this pit lake site.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {([
                ['pitName',             'Pit Name *'],
                ['companyName',         'Company Name *'],
                ['assessmentPeriod',    'Assessment Period'],
                ['regency',             'Regency / Location'],
                ['locationCoordinate',  'Coordinates (lat, lng)'],
                ['pitLakeAreaHa',       'Pit Lake Area (ha)'],
                ['catchmentAreaHa',     'Catchment Area (ha)'],
                ['sourceOfInflow',      'Source of Inflow'],
                ['riverDownstream',     'River Downstream'],
                ['villagesDownstream',  'Villages Downstream'],
              ] as [keyof Identity, string][]).map(([key, label]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', display: 'block', marginBottom: 5 }}>
                    {label}
                  </label>
                  <input
                    value={identity[key]}
                    onChange={e => setIdentity(prev => ({ ...prev, [key]: e.target.value }))}
                    style={{
                      width: '100%', padding: '8px 12px',
                      border: '1px solid var(--line)', borderRadius: 'var(--radius)',
                      background: 'var(--surface-2)', color: 'var(--ink)', fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
              <button
                disabled={!identity.pitName || !identity.companyName}
                onClick={() => setShowModal(false)}
                style={{
                  padding: '10px 24px', borderRadius: 'var(--radius)',
                  background: 'var(--primary)', color: 'var(--primary-ink)',
                  border: 'none', cursor: identity.pitName && identity.companyName ? 'pointer' : 'not-allowed',
                  opacity: identity.pitName && identity.companyName ? 1 : 0.5,
                  fontSize: 13, fontWeight: 600,
                }}
              >
                Start Assessment →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="wizard-layout">
        <div className="wizard-steps">
          <StepsSidebar currentStep={step} scores={scores} onStepClick={setStep} />
        </div>

        <div className="wizard-content">
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{cat.label}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>
              Weight: {(cat.weight * 100).toFixed(0)}% · {cat.parent}
            </div>
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

              {step < FRAMEWORK.length - 1 ? (
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
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '9px 22px', borderRadius: 'var(--radius)',
                    background: 'var(--sc-good)', color: '#fff',
                    border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  }}
                >
                  Submit Assessment ✓
                </button>
              )}
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
