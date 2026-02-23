import 'dotenv/config';
import fastify from 'fastify';
import { errorHandler } from './src/middlewares/ErrorHandler.js';

const app = fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

app.register(import('./routes.js'));

app.setErrorHandler(errorHandler);

// Inicializando o servidor.
const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
