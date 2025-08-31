import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { connectDatabase } from './config/database';
import logger from './config/logger';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

import { createPizzaRoutes } from './routes/pizza.routes';
import { createOrderRoutes } from './routes/order.routes';

import { PizzaController } from './controllers/pizza.controller';
import { OrderController } from './controllers/order.controller';

import { PizzaService } from './services/pizza.service';
import { OrderService } from './services/order.service';

import { PizzaBaseRepository, PizzaSizeRepository, ToppingRepository } from './repositories/pizza.repository';
import { OrderRepository } from './repositories/order.repository';

import { prisma } from './config/database';

dotenv.config();

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.app.use(helmet());

    this.app.use(cors({
      origin: process.env["NODE_ENV"] === 'production'
        ? process.env["ALLOWED_ORIGINS"]?.split(',')
        : true,
      credentials: true,
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: Number(process.env["RATE_LIMIT_WINDOW_MS"]) || 15 * 60 * 1000,
      max: Number(process.env["RATE_LIMIT_MAX_REQUESTS"]) || 100,
      message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
      },
    });
    this.app.use('/api/', limiter);

    this.app.use(compression());

    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    this.app.use(morgan('combined', {
      stream: {
        write: (message: string) => {
          logger.info(message.trim());
        },
      },
    }));

    this.app.use((req, res, next) => {
      logger.info(`${req.method} ${req.originalUrl}`, {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      });
      next();
    });
  }

  private initializeRoutes(): void {
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'Pizza Ordering API is running',
        timestamp: new Date().toISOString(),
        environment: process.env["NODE_ENV"],
      });
    });

    const pizzaBaseRepository = new PizzaBaseRepository(prisma);
    const pizzaSizeRepository = new PizzaSizeRepository(prisma);
    const toppingRepository = new ToppingRepository(prisma);
    const orderRepository = new OrderRepository(prisma);

    const pizzaService = new PizzaService(pizzaBaseRepository, pizzaSizeRepository, toppingRepository);
    const orderService = new OrderService(orderRepository, pizzaService);

    const pizzaController = new PizzaController(pizzaService);
    const orderController = new OrderController(orderService);

    this.app.use('/api/pizza', createPizzaRoutes(pizzaController));
    this.app.use('/api/orders', createOrderRoutes(orderController));

    this.app.get('/api', (req, res) => {
      res.json({
        success: true,
        message: 'Pizza Ordering API',
        version: '1.0.0',
        endpoints: {
          health: 'GET /health',
          pizza: {
            bases: 'GET /api/pizza/bases',
            sizes: 'GET /api/pizza/sizes',
            toppings: 'GET /api/pizza/toppings',
          },
          orders: {
            create: 'POST /api/orders',
            list: 'GET /api/orders',
            getById: 'GET /api/orders/:id',
            update: 'PUT /api/orders/:id',
            delete: 'DELETE /api/orders/:id',
            byStatus: 'GET /api/orders/status/:status',
            stats: 'GET /api/orders/stats/overview',
          },
        },
      });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(notFoundHandler);

    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      await connectDatabase();

      const port = process.env["PORT"] || 3000;
      this.app.listen(port, () => {
        logger.info(`Server is running on port ${port}`);
      });
    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}
