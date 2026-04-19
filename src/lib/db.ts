import Dexie, { Table } from 'dexie';
import { PitSite, PitDraft } from '@/types';

class PitLakeDB extends Dexie {
  pits!: Table<PitSite>;
  drafts!: Table<PitDraft>;

  constructor() {
    super('pit-lake-db');
    this.version(1).stores({
      pits: 'id, pitName, companyName, finalScore, rating, assessedAt, updatedAt',
      drafts: 'id',
    });
  }
}

export const db = new PitLakeDB();
