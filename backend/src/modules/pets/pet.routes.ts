export const petRoutes = {
  list: 'GET /api/v1/pets',
  detail: 'GET /api/v1/pets/:id',
  create: 'POST /api/v1/pets',
  update: 'PATCH /api/v1/pets/:id',
} as const;
