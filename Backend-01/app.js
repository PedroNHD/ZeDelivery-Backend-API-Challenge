import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { errorHandler } from './src/handlers/ErrorHandler.js';
import routes from './routes.js';

export async function build(opts = {}) {
  const app = fastify({
    logger: true,
    ...opts,
  });

  await app.register(helmet);

  if (process.env.SYSTEM_STATE === 'dev') {
    app.log.info('Running in development mode');
    await app.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
  } else {
    app.log.info('Running in production mode');

    await app.register(cors, {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
  }

  const apiVersion = process.env.API_VERSION || 'v1';
  await app.register(routes, { prefix: `/api/${apiVersion}` });

  app.setErrorHandler(errorHandler);

  return app;
}
