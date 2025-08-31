import { App } from './app';
import { connectDatabase } from './config/database';
import logger from './config/logger';

const app = new App();

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    await app.start();
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
};

startServer();
