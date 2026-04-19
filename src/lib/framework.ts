import { CategoryScores } from '@/types';

export interface Indicator {
  key: string;
  label: string;
  criteria: [string, string, string, string, string];
}

export interface FrameworkCategory {
  key: keyof CategoryScores;
  label: string;
  weight: number;
  parent: "Environmental" | "Economic" | "Community" | "Government";
  indicators: Indicator[];
}

export const FRAMEWORK: FrameworkCategory[] = [
  {
    key: "catchmentCondition",
    label: "Catchment Condition",
    weight: 0.15,
    parent: "Environmental",
    indicators: [
      { key: "vegetationCover", label: "Vegetation cover",
        criteria: ["<20%", "20–40%", "40–60%", "60–80%", ">80%"] },
      { key: "vegetationComposition", label: "Vegetation composition",
        criteria: ["Very poor", "Poor", "Moderate", "Good", "Ideal 30/70"] },
      { key: "soilStability", label: "Soil stability",
        criteria: ["Very poor", "Poor", "Moderate", "Good", "Excellent"] },
    ],
  },
  {
    key: "waterQuality",
    label: "Water Quality",
    weight: 0.20,
    parent: "Environmental",
    indicators: [
      { key: "amdPotency", label: "Acid Mine Drainage — potency",
        criteria: ["No prevention · pH<5", "Minimal · 5<pH<6", "Inadequate plan, partial", "Have plan, partial impl.", "Full plan, consistent · no AMD"] },
      { key: "heavyMetals", label: "Heavy metals (Fe, Mn, Cd)",
        criteria: [">4× standard", "2–4× standard", "1–2× standard", "At or below standard", "Significantly below"] },
      { key: "dissolvedOxygen", label: "Dissolved oxygen",
        criteria: ["<2 mg/L", "2–5 mg/L", "5–6 mg/L", "6–7 mg/L", "≥7 mg/L"] },
      { key: "tssLevel", label: "TSS level",
        criteria: [">100 mg/L", "50–100 mg/L", "20–50 mg/L", "10–20 mg/L", "<10 mg/L"] },
    ],
  },
  {
    key: "pitLakeStability",
    label: "Pit Lake Stability",
    weight: 0.15,
    parent: "Environmental",
    indicators: [
      { key: "slopeStability", label: "Shape & slope stability (SDI)",
        criteria: ["SDI≥4.5", "3.5–4.5", "2.5–3.5", "1.5–2.5", "SDI≤1.5"] },
      { key: "ecologicalFunctionality", label: "Ecological functionality",
        criteria: ["Limited", "Some", "Moderate", "High", "Very high"] },
      { key: "accessibility", label: "Accessibility & management",
        criteria: ["Difficult", "Somewhat difficult", "Moderately easy", "Easy", "Very easy"] },
    ],
  },
  {
    key: "hydrology",
    label: "Hydrology",
    weight: 0.10,
    parent: "Environmental",
    indicators: [
      { key: "waterInflowSustainability", label: "Water inflow sustainability",
        criteria: ["Very poor", "Poor", "Moderate", "Good", "Excellent"] },
      { key: "catchmentRatio", label: "Catchment-to-pit-lake ratio",
        criteria: ["<1:1 or >20:1", "1–3:1", "3–5:1", "5–10:1", "10–20:1"] },
    ],
  },
  {
    key: "economicBenefits",
    label: "Economic Benefits",
    weight: 0.20,
    parent: "Economic",
    indicators: [
      { key: "agriculturalOpportunities", label: "Agricultural / aquacultural opportunities",
        criteria: ["Very low", "Low", "Moderate", "High", "Very high"] },
      { key: "localEntrepreneurship", label: "Local entrepreneurship development",
        criteria: ["Very low", "Low", "Moderate", "High", "Very high"] },
      { key: "jobCreation", label: "Job creation",
        criteria: ["<50 jobs", "50–100", "100–200", "200–500", ">500 jobs"] },
      { key: "futureEconomic", label: "Future economic opportunities",
        criteria: ["Very low", "Low", "Moderate", "High", "Very high"] },
    ],
  },
  {
    key: "community",
    label: "Community",
    weight: 0.15,
    parent: "Community",
    indicators: [
      { key: "safety", label: "Safety",
        criteria: ["None", "Basic", "Adequate", "Advanced", "Extensive"] },
      { key: "involvement", label: "Involvement in planning",
        criteria: ["None", "Minimal", "Moderate", "High", "Very high"] },
      { key: "communityInstitutions", label: "Community institutions support",
        criteria: ["No support", "Limited", "Moderate", "High", "Very high"] },
    ],
  },
  {
    key: "government",
    label: "Government",
    weight: 0.05,
    parent: "Government",
    indicators: [
      { key: "policySupport", label: "Policy & regulatory support",
        criteria: ["Very low", "Low", "Moderate", "High", "Very high – extensive"] },
    ],
  },
];
