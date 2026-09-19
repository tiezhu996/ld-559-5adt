import { create } from 'zustand';

interface UiState {
  collapsed: boolean;
  selectedPetId?: string;
  setCollapsed: (collapsed: boolean) => void;
  setSelectedPetId: (id?: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
  setSelectedPetId: (selectedPetId) => set({ selectedPetId }),
}));
