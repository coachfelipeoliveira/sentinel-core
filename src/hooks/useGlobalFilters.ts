import { create } from 'zustand';

export const empresas = [
  'Todas as Empresas',
  'iFood',
  'Nubank',
  'Rappi',
  'Magazine Luiza',
  'Via Varejo',
  'Localiza',
  'C6 Bank',
  'PagSeguro',
  'Stone',
  'Creditas',
  'QuintoAndar',
  'Loggi',
  'Mercado Bitcoin',
  'Warren',
  'Neon',
  'Banco Inter',
  'GetNinjas',
  'Vindi',
  'Pagar.me',
  'Gympass',
] as const;

export type EolStatus = 'todos' | 'eol' | 'non-eol';

interface GlobalFiltersState {
  empresa: string;
  eolStatus: EolStatus;
  setEmpresa: (empresa: string) => void;
  setEolStatus: (status: EolStatus) => void;
  resetFilters: () => void;
  isFiltered: () => boolean;
}

export const useGlobalFilters = create<GlobalFiltersState>((set, get) => ({
  empresa: 'Todas as Empresas',
  eolStatus: 'todos',
  setEmpresa: (empresa) => set({ empresa }),
  setEolStatus: (eolStatus) => set({ eolStatus }),
  resetFilters: () => set({ empresa: 'Todas as Empresas', eolStatus: 'todos' }),
  isFiltered: () => {
    const state = get();
    return state.empresa !== 'Todas as Empresas' || state.eolStatus !== 'todos';
  },
}));
