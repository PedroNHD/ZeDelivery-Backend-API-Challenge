export default async function routes(app) {
  const partnerRoutes = (await import('./src/modules/partner/partner.routes.js')).default;
  partnerRoutes(app);
}
