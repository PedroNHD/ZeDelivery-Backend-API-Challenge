import 'dotenv/config';
import { build } from './app.js';
import { AppDataSource } from './src/lib/data-source.js';

const app = build({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

// Inicializando o servidor.
const start = async () => {
  try {
    await AppDataSource.initialize();
    app.log.info('Data Source has been initialized!');
    await app.listen({ port: PORT, host: '0.0.0.0' });
  } catch (err) {
    app.log.error('Error during Data Source initialization:', err);
    app.log.error(err);
    process.exit(1);
  }
};

start();
