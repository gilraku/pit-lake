import { v4 as uuidv4 } from 'uuid';
import { PitSite, RawScores } from '@/types';
import { calculate } from './scoring';

function makePit(
  pitName: string,
  companyName: string,
  regency: string,
  locationCoordinate: string,
  assessmentPeriod: string,
  scores: RawScores,
  extra: Partial<PitSite> = {}
): PitSite {
  const { catScores, finalScore, finalRaw, rating } = calculate(scores);
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    pitName,
    companyName,
    assessmentPeriod,
    regency,
    locationCoordinate,
    pitLakeAreaHa: null,
    catchmentAreaHa: null,
    sourceOfInflow: '',
    riverDownstream: '',
    villagesDownstream: '',
    scores,
    catScores,
    finalScore,
    finalRaw,
    rating,
    assessedAt: now,
    updatedAt: now,
    ...extra,
  };
}

export const SEED_PITS: PitSite[] = [
  makePit(
    'Lake Mahakam A', 'PT Multi Harapan Utama', 'Kutai Kartanegara, East Kalimantan',
    // Kawasan tambang Loa Kulu — Kutai Kartanegara (area bekas tambang PT Mahakam Sumber Jaya)
    '-0.451, 117.093', '2024-Q1',
    {
      catchmentCondition: { vegetationCover: 5, vegetationComposition: 4, soilStability: 5 },
      waterQuality: { amdPotency: 5, heavyMetals: 4, dissolvedOxygen: 5, tssLevel: 5 },
      pitLakeStability: { slopeStability: 5, ecologicalFunctionality: 4, accessibility: 4 },
      hydrology: { waterInflowSustainability: 5, catchmentRatio: 5 },
      economicBenefits: { agriculturalOpportunities: 4, localEntrepreneurship: 4, jobCreation: 4, futureEconomic: 5 },
      community: { safety: 5, involvement: 5, communityInstitutions: 4 },
      government: { policySupport: 4 },
    }
  ),
  makePit(
    'Lake Berau North', 'PT Berau Coal', 'Berau, East Kalimantan',
    // Area Binungan — PT Berau Coal, salah satu pit lake terbesar di Kaltim
    '2.261, 117.114', '2024-Q1',
    {
      catchmentCondition: { vegetationCover: 5, vegetationComposition: 4, soilStability: 4 },
      waterQuality: { amdPotency: 5, heavyMetals: 4, dissolvedOxygen: 4, tssLevel: 5 },
      pitLakeStability: { slopeStability: 5, ecologicalFunctionality: 4, accessibility: 4 },
      hydrology: { waterInflowSustainability: 4, catchmentRatio: 4 },
      economicBenefits: { agriculturalOpportunities: 4, localEntrepreneurship: 4, jobCreation: 3, futureEconomic: 4 },
      community: { safety: 4, involvement: 5, communityInstitutions: 4 },
      government: { policySupport: 4 },
    }
  ),
  makePit(
    'Lake Samarinda B', 'PT Insani Bara Perkasa', 'Samarinda, East Kalimantan',
    // Area Loa Janan — salah satu kawasan pit lake aktif di pinggiran Samarinda
    '-0.607, 117.214', '2024-Q1',
    {
      catchmentCondition: { vegetationCover: 4, vegetationComposition: 4, soilStability: 4 },
      waterQuality: { amdPotency: 4, heavyMetals: 4, dissolvedOxygen: 4, tssLevel: 4 },
      pitLakeStability: { slopeStability: 4, ecologicalFunctionality: 4, accessibility: 4 },
      hydrology: { waterInflowSustainability: 4, catchmentRatio: 4 },
      economicBenefits: { agriculturalOpportunities: 4, localEntrepreneurship: 3, jobCreation: 3, futureEconomic: 4 },
      community: { safety: 4, involvement: 4, communityInstitutions: 4 },
      government: { policySupport: 3 },
    }
  ),
  makePit(
    'Lake Tabalong', 'PT Adaro Indonesia', 'Tabalong, South Kalimantan',
    // Kecamatan Tanjung — area konsesi PT Adaro Indonesia, Tabalong
    '-2.176, 115.427', '2024-Q1',
    {
      catchmentCondition: { vegetationCover: 4, vegetationComposition: 3, soilStability: 4 },
      waterQuality: { amdPotency: 4, heavyMetals: 3, dissolvedOxygen: 4, tssLevel: 4 },
      pitLakeStability: { slopeStability: 3, ecologicalFunctionality: 4, accessibility: 3 },
      hydrology: { waterInflowSustainability: 3, catchmentRatio: 4 },
      economicBenefits: { agriculturalOpportunities: 3, localEntrepreneurship: 3, jobCreation: 3, futureEconomic: 4 },
      community: { safety: 4, involvement: 3, communityInstitutions: 3 },
      government: { policySupport: 3 },
    }
  ),
  makePit(
    'Lake Barito B', 'PT Asmin Bara Bronang', 'Barito Utara, Central Kalimantan',
    // Puruk Cahu — area tambang Barito Utara, Kalteng (PT Asmin Bara Bronang)
    '-0.857, 114.895', '2024-Q1',
    {
      catchmentCondition: { vegetationCover: 3, vegetationComposition: 3, soilStability: 3 },
      waterQuality: { amdPotency: 3, heavyMetals: 3, dissolvedOxygen: 3, tssLevel: 3 },
      pitLakeStability: { slopeStability: 3, ecologicalFunctionality: 3, accessibility: 3 },
      hydrology: { waterInflowSustainability: 3, catchmentRatio: 3 },
      economicBenefits: { agriculturalOpportunities: 3, localEntrepreneurship: 2, jobCreation: 2, futureEconomic: 3 },
      community: { safety: 3, involvement: 2, communityInstitutions: 3 },
      government: { policySupport: 3 },
    }
  ),
  makePit(
    'Lake Musi C', 'PT Bukit Asam', 'Muara Enim, South Sumatra',
    // Tanjung Enim — area tambang PT Bukit Asam (PTBA), Sumatera Selatan
    '-3.749, 103.763', '2024-Q1',
    {
      catchmentCondition: { vegetationCover: 2, vegetationComposition: 2, soilStability: 1 },
      waterQuality: { amdPotency: 2, heavyMetals: 1, dissolvedOxygen: 2, tssLevel: 2 },
      pitLakeStability: { slopeStability: 2, ecologicalFunctionality: 2, accessibility: 3 },
      hydrology: { waterInflowSustainability: 2, catchmentRatio: 2 },
      economicBenefits: { agriculturalOpportunities: 2, localEntrepreneurship: 1, jobCreation: 1, futureEconomic: 2 },
      community: { safety: 2, involvement: 1, communityInstitutions: 2 },
      government: { policySupport: 2 },
    }
  ),
];
