import axios from 'axios';
import { message } from 'antd';
import { useAuthStore } from '../stores/authStore';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const request = axios.create({
  baseURL: '/api/v1',
  timeout: 8000,
});

request.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse<unknown>;
    if (typeof body?.code === 'number' && body.code !== 0) {
      message.error(body.message || '请求失败');
      return Promise.reject(new Error(body.message));
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    message.error(error.response?.data?.message || error.message || '网络异常');
    return Promise.reject(error);
  },
);

export async function unwrap<T>(promise: Promise<{ data: ApiResponse<T> }>, fallback: T): Promise<T> {
  try {
    const res = await promise;
    return res.data.data;
  } catch {
    return fallback;
  }
}
