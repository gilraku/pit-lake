export type Rating = "Excellent" | "Good" | "Fair" | "Poor" | "Very Poor";

export interface CategoryScores {
  catchmentCondition: number;
  waterQuality: number;
  pitLakeStability: number;
  hydrology: number;
  economicBenefits: number;
  community: number;
  government: number;
}

export interface RawScores {
  catchmentCondition?: {
    vegetationCover?: number;
    vegetationComposition?: number;
    soilStability?: number;
  };
  waterQuality?: {
    amdPotency?: number;
    heavyMetals?: number;
    dissolvedOxygen?: number;
    tssLevel?: number;
  };
  pitLakeStability?: {
    slopeStability?: number;
    ecologicalFunctionality?: number;
    accessibility?: number;
  };
  hydrology?: {
    waterInflowSustainability?: number;
    catchmentRatio?: number;
  };
  economicBenefits?: {
    agriculturalOpportunities?: number;
    localEntrepreneurship?: number;
    jobCreation?: number;
    futureEconomic?: number;
  };
  community?: {
    safety?: number;
    involvement?: number;
    communityInstitutions?: number;
  };
  government?: {
    policySupport?: number;
  };
}

export interface PitSite {
  id: string;
  pitName: string;
  companyName: string;
  assessmentPeriod: string;
  regency: string;
  locationCoordinate: string;
  pitLakeAreaHa: number | null;
  catchmentAreaHa: number | null;
  sourceOfInflow: string;
  riverDownstream: string;
  villagesDownstream: string;
  scores: RawScores;
  catScores: CategoryScores;
  finalScore: number;
  finalRaw: number;
  rating: Rating;
  assessedAt: string;
  updatedAt: string;
}

export type PitDraft = Omit<PitSite, 'catScores' | 'finalScore' | 'finalRaw' | 'rating' | 'updatedAt'> & {
  catScores?: Partial<CategoryScores>;
  finalScore?: number;
  finalRaw?: number;
  rating?: Rating;
};
