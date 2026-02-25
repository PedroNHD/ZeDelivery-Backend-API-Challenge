import 'dotenv/config';
import { build } from './app.js';

const app = build({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

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
