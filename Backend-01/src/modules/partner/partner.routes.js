import {
  createPartnerController,
  getPartnerByIdController,
  searchPartnerController,
} from './partner.controller.js';
import { partnerSchema } from './partner.schema.js';

export default function partnerRoutes(app) {
  app.post('/partners', { schema: partnerSchema }, createPartnerController);
  app.get('/partners/:id', getPartnerByIdController);
  app.get('/partners/search', searchPartnerController);
}
