import { useMutation } from '@tanstack/react-query';
import { request } from '../utils/request';
import { useAuthStore, AuthUser } from '../stores/authStore';

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession);
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await request.post<{ code: number; message: string; data: { token: string; user: AuthUser } }>('/auth/login', payload);
      return res.data.data;
    },
    onSuccess: (data) => setSession(data.token, data.user),
  });
}

export function useAuth() {
  return useAuthStore();
}
