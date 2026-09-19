import { create } from 'zustand';
import { UserRole } from '../constants/enums';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  token: string;
  user?: AuthUser;
  setSession: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const saved = localStorage.getItem('ldpetcare-auth');

export const useAuthStore = create<AuthState>((set) => ({
  token: saved ? JSON.parse(saved).token : '',
  user: saved ? JSON.parse(saved).user : undefined,
  setSession: (token, user) => {
    localStorage.setItem('ldpetcare-auth', JSON.stringify({ token, user }));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('ldpetcare-auth');
    set({ token: '', user: undefined });
  },
}));
