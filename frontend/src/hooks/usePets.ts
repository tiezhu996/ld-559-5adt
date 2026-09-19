import { useQuery } from '@tanstack/react-query';
import { petApi } from '../api/petApi';
import { medicalApi } from '../api/medicalApi';
import { vaccineApi } from '../api/vaccineApi';
import { insuranceApi } from '../api/insuranceApi';

export const usePets = (params?: { species?: string; q?: string }) =>
  useQuery({ queryKey: ['pets', params], queryFn: () => petApi.list(params) });

export const usePetDetail = (id: string) =>
  useQuery({ queryKey: ['pet', id], queryFn: () => petApi.detail(id), enabled: Boolean(id) });

export const usePetMedical = (petId?: string) =>
  useQuery({ queryKey: ['medical', petId], queryFn: () => medicalApi.list({ petId }), enabled: Boolean(petId) });

export const usePetVaccines = (petId?: string) =>
  useQuery({ queryKey: ['vaccines', petId], queryFn: () => vaccineApi.list({ petId }), enabled: Boolean(petId) });

export const usePetInsurance = (petId?: string) =>
  useQuery({ queryKey: ['insurance', petId], queryFn: () => insuranceApi.list({ petId }), enabled: Boolean(petId) });
