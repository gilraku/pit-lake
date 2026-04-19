'use client';

import { create } from 'zustand';
import { PitSite, PitDraft } from '@/types';
import { pitRepository } from '@/lib/repositories';

interface PitStore {
  pits: PitSite[];
  isLoading: boolean;

  loadPits: () => Promise<void>;
  savePit: (pit: PitSite) => Promise<void>;
  deletePit: (id: string) => Promise<void>;

  formDraft: PitDraft | null;
  setFormDraft: (draft: PitDraft | null) => void;
  persistDraft: () => Promise<void>;

  compareSel: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;

  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const usePitStore = create<PitStore>((set, get) => ({
  pits: [],
  isLoading: false,

  loadPits: async () => {
    set({ isLoading: true });
    try {
      const pits = await pitRepository.getAll();
      set({ pits });
    } finally {
      set({ isLoading: false });
    }
  },

  savePit: async (pit) => {
    await pitRepository.save(pit);
    await get().loadPits();
  },

  deletePit: async (id) => {
    await pitRepository.delete(id);
    set(state => ({ pits: state.pits.filter(p => p.id !== id) }));
  },

  formDraft: null,

  setFormDraft: (draft) => set({ formDraft: draft }),

  persistDraft: async () => {
    const draft = get().formDraft;
    if (!draft) return;
    await pitRepository.saveDraft(draft);
  },

  compareSel: [],

  toggleCompare: (id) => {
    set(state => {
      const sel = state.compareSel;
      if (sel.includes(id)) return { compareSel: sel.filter(s => s !== id) };
      if (sel.length >= 4) return state;
      return { compareSel: [...sel, id] };
    });
  },

  clearCompare: () => set({ compareSel: [] }),

  theme: 'light',

  toggleTheme: () => {
    set(state => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', next);
      }
      return { theme: next };
    });
  },
}));
