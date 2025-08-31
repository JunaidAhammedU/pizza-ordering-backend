import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { sendSuccess, sendError } from '../utils/response';
import { ValidationError } from '../utils/errors';
import logger from '../config/logger';

export class OrderController {
  constructor(private orderService: OrderService) { }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const order = await this.orderService.createOrder(req.body);
      sendSuccess(res, order, 'Order created successfully', 201);
    } catch (error) {
      logger.error('Error creating order:', error);
      if (error instanceof ValidationError) {
        sendError(res, error.message, error.statusCode);
      } else {
        console.error('Error creating order:', error);
        // sendError(res, 'Failed to create order', 500);
      }
    }
  }
}
