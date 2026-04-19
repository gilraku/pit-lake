import { describe, it, expect } from 'vitest';
import { calculate } from './scoring';
import { RawScores } from '@/types';

const seed1: RawScores = {
  catchmentCondition: { vegetationCover: 5, vegetationComposition: 4, soilStability: 5 },
  waterQuality: { amdPotency: 5, heavyMetals: 4, dissolvedOxygen: 5, tssLevel: 5 },
  pitLakeStability: { slopeStability: 5, ecologicalFunctionality: 4, accessibility: 4 },
  hydrology: { waterInflowSustainability: 5, catchmentRatio: 5 },
  economicBenefits: { agriculturalOpportunities: 4, localEntrepreneurship: 4, jobCreation: 4, futureEconomic: 5 },
  community: { safety: 5, involvement: 5, communityInstitutions: 4 },
  government: { policySupport: 4 },
};

const seed6: RawScores = {
  catchmentCondition: { vegetationCover: 2, vegetationComposition: 2, soilStability: 1 },
  waterQuality: { amdPotency: 2, heavyMetals: 1, dissolvedOxygen: 2, tssLevel: 2 },
  pitLakeStability: { slopeStability: 2, ecologicalFunctionality: 2, accessibility: 3 },
  hydrology: { waterInflowSustainability: 2, catchmentRatio: 2 },
  economicBenefits: { agriculturalOpportunities: 2, localEntrepreneurship: 1, jobCreation: 1, futureEconomic: 2 },
  community: { safety: 2, involvement: 1, communityInstitutions: 2 },
  government: { policySupport: 2 },
};

describe('calculate()', () => {
  it('seed1 → Excellent (≥80)', () => {
    const result = calculate(seed1);
    expect(result.rating).toBe('Excellent');
    expect(result.finalScore).toBeGreaterThanOrEqual(80);
  });

  it('seed6 → Poor (20–39)', () => {
    const result = calculate(seed6);
    expect(result.rating).toBe('Poor');
    expect(result.finalScore).toBeGreaterThanOrEqual(20);
    expect(result.finalScore).toBeLessThan(40);
  });

  it('returns 7 catScores keys', () => {
    const result = calculate(seed1);
    const keys = Object.keys(result.catScores);
    expect(keys).toHaveLength(7);
  });

  it('empty scores → finalScore 0 and Very Poor', () => {
    const result = calculate({});
    expect(result.finalScore).toBe(0);
    expect(result.rating).toBe('Very Poor');
  });

  it('finalRaw = weighted sum of catScore averages', () => {
    const result = calculate(seed1);
    expect(result.finalRaw).toBeGreaterThan(0);
    expect(result.finalRaw).toBeLessThanOrEqual(5);
  });

  it('finalScore = round(finalRaw / 5 * 100)', () => {
    const result = calculate(seed1);
    expect(result.finalScore).toBe(Math.round(result.finalRaw / 5 * 100));
  });
});
