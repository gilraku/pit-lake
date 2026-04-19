import { DexiePitRepository } from './DexiePitRepository';
import { IPitRepository } from './IPitRepository';

export const pitRepository: IPitRepository = new DexiePitRepository();
