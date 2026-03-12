import partnerRoutes from './src/modules/partner/partner.routes.js';

export default async function routes(app) {
  await app.register(partnerRoutes, { prefix: '/partners' });
}
