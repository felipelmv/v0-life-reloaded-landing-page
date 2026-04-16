import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GameState {
  balance: number;
  currentDate: string; // ex: "2008-01-01"
  skills: Record<string, number>;
  inventory: Record<string, number>;
  logs: Array<{ date: string; text: string; type: 'system' | 'action' | 'result' }>;
  
  // Actions
  setBalance: (amount: number) => void;
  updateDate: (newDate: string) => void;
  updateSkill: (skill: string, level: number) => void;
  updateInventory: (item: string, amount: number) => void;
  addLog: (log: { date: string; text: string; type: 'system' | 'action' | 'result' }) => void;
  resetGame: (initialDate: string, initialBalance: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      balance: 0,
      currentDate: "2008-01-01",
      skills: {},
      inventory: {},
      logs: [],
      
      setBalance: (balance) => set({ balance }),
      updateDate: (currentDate) => set({ currentDate }),
      updateSkill: (skill, level) => 
        set((state) => ({ skills: { ...state.skills, [skill]: level } })),
      updateInventory: (item, amount) =>
        set((state) => {
          const current = state.inventory[item] || 0;
          return { inventory: { ...state.inventory, [item]: current + amount } };
        }),
      addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
      resetGame: (initialDate, initialBalance) => 
        set({ balance: initialBalance, currentDate: initialDate, skills: {}, inventory: {}, logs: [] }),
    }),
    {
      name: 'life-reloaded-save', // Chave no localStorage
    }
  )
);
