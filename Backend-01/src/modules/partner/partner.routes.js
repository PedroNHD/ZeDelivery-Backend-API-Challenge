import {
  createPartnerController,
  getPartnerByIdController,
  searchPartnerController,
} from './partner.controller.js';
import {
  createPartnerSchema,
  getPartnerByIdSchema,
  searchPartnerSchema,
} from './partner.schema.js';

export default function partnerRoutes(app) {
  // Rota: POST /api/v1/partners
  app.post('/', { schema: createPartnerSchema }, createPartnerController);
  // Rota: GET /api/v1/partners/search
  app.get('/search', { schema: searchPartnerSchema }, searchPartnerController);
  // Rota: GET /api/v1/partners/:id
  app.get('/:id', { schema: getPartnerByIdSchema }, getPartnerByIdController);
}
