import { db } from '@/lib/db';
import { PitSite, PitDraft } from '@/types';
import { IPitRepository } from './IPitRepository';

export class DexiePitRepository implements IPitRepository {
  async getAll(): Promise<PitSite[]> {
    return db.pits.orderBy('assessedAt').reverse().toArray();
  }

  async getById(id: string): Promise<PitSite | null> {
    return (await db.pits.get(id)) ?? null;
  }

  async save(pit: PitSite): Promise<void> {
    await db.pits.put(pit);
  }

  async delete(id: string): Promise<void> {
    await db.pits.delete(id);
  }

  async saveDraft(draft: PitDraft): Promise<void> {
    await db.drafts.put(draft);
  }

  async getDraft(id: string): Promise<PitDraft | null> {
    return (await db.drafts.get(id)) ?? null;
  }

  async clearDraft(id: string): Promise<void> {
    await db.drafts.delete(id);
  }
}
