import fastify from 'fastify';
import { errorHandler } from './src/handlers/ErrorHandler.js';
import routes from './routes.js';

export function build(opts = {}) {
  const app = fastify(opts);

  app.register(routes);
  app.setErrorHandler(errorHandler);

  return app;
}
