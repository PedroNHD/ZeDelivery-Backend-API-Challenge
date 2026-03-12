import 'dotenv/config';
import { build } from './app.js';
import { AppDataSource } from './src/lib/data-source.js';

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    const app = await build({ logger: true });

    await AppDataSource.initialize();
    app.log.info('📦 Data Source (Oracle) inicializado com sucesso!');

    await app.listen({ port: PORT, host: '0.0.0.0' });

    const gracefulShutdown = async signal => {
      app.log.info(`🛑 Sinal ${signal} recebido. Encerrando aplicação...`);

      await app.close();
      await AppDataSource.destroy();

      app.log.info('✅ Servidor e Banco de Dados encerrados com segurança.');
      process.exit(0);
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('❌ Erro fatal durante a inicialização do servidor:', err);
    process.exit(1);
  }
};

start();
