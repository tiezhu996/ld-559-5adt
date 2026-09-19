import { request, unwrap } from '../utils/request';
import { mockPets } from '../utils/mockData';
import type { Pet } from '../types/pet';

export const petApi = {
  list: (params?: { species?: string; q?: string }) => unwrap<Pet[]>(request.get('/pets', { params }), mockPets),
  detail: (id: string) => unwrap<Pet>(request.get(`/pets/${id}`), mockPets.find((pet) => pet.id === id) || mockPets[0]),
  create: (payload: Partial<Pet>) => request.post('/pets', payload),
};
