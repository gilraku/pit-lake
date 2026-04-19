import { PitSite, PitDraft } from '@/types';

export interface IPitRepository {
  getAll(): Promise<PitSite[]>;
  getById(id: string): Promise<PitSite | null>;
  save(pit: PitSite): Promise<void>;
  delete(id: string): Promise<void>;
  saveDraft(draft: PitDraft): Promise<void>;
  getDraft(id: string): Promise<PitDraft | null>;
  clearDraft(id: string): Promise<void>;
}
