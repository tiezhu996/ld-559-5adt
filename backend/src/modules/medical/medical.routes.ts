export const medicalRoutes = {
  list: 'GET /api/v1/medical',
  create: 'POST /api/v1/medical',
  update: 'PATCH /api/v1/medical/:id',
} as const;
