import { FRAMEWORK } from './framework';
import { RawScores, CategoryScores, Rating } from '@/types';

export interface ScoreResult {
  catScores: CategoryScores;
  finalScore: number;
  finalRaw: number;
  rating: Rating;
}

export function calculate(scores: RawScores): ScoreResult {
  let total = 0;
  const catScores = {} as CategoryScores;

  FRAMEWORK.forEach(cat => {
    let sum = 0, cnt = 0;
    cat.indicators.forEach(ind => {
      const catScoreEntry = scores[cat.key as keyof RawScores];
      const v = catScoreEntry ? (catScoreEntry as Record<string, number | undefined>)[ind.key] : undefined;
      if (v) { sum += v; cnt++; }
    });
    const avg = cnt ? sum / cnt : 0;
    catScores[cat.key] = avg;
    total += avg * cat.weight;
  });

  const finalScore = Math.round(total / 5 * 100);
  const rating: Rating =
    finalScore >= 80 ? "Excellent" :
    finalScore >= 60 ? "Good" :
    finalScore >= 40 ? "Fair" :
    finalScore >= 20 ? "Poor" : "Very Poor";

  return { catScores, finalScore, finalRaw: total, rating };
}

export function ratingClass(rating: Rating): string {
  const map: Record<Rating, string> = {
    "Excellent": "exc", "Good": "good", "Fair": "fair",
    "Poor": "poor", "Very Poor": "vp"
  };
  return map[rating];
}

export function scoreColor(v: number): string {
  if (!v) return "var(--line)";
  if (v >= 4.5) return "var(--sc-exc)";
  if (v >= 3.5) return "var(--sc-good)";
  if (v >= 2.5) return "var(--sc-fair)";
  if (v >= 1.5) return "var(--sc-poor)";
  return "var(--sc-vp)";
}

export function pctColor(p: number): string {
  if (p >= 80) return "var(--sc-exc)";
  if (p >= 60) return "var(--sc-good)";
  if (p >= 40) return "var(--sc-fair)";
  if (p >= 20) return "var(--sc-poor)";
  return "var(--sc-vp)";
}
