export const insuranceRoutes = {
  list: 'GET /api/v1/insurance',
  create: 'POST /api/v1/insurance',
  claim: 'PATCH /api/v1/insurance/:id/claim',
  update: 'PATCH /api/v1/insurance/:id',
} as const;
