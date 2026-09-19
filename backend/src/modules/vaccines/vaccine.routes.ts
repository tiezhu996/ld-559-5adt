export const vaccineRoutes = {
  list: 'GET /api/v1/vaccines',
  create: 'POST /api/v1/vaccines',
  complete: 'PATCH /api/v1/vaccines/:id/complete',
  update: 'PATCH /api/v1/vaccines/:id',
} as const;
