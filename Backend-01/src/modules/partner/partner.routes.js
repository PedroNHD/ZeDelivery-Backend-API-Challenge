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
  app.post('/partners', { schema: createPartnerSchema }, createPartnerController);
  app.get('/partners/:id', { schema: getPartnerByIdSchema }, getPartnerByIdController);
  app.get('/partners/search', { schema: searchPartnerSchema }, searchPartnerController);
}
