import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/response';
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
        sendError(res, 'Failed to create order', 500);
      }
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id!);
      sendSuccess(res, order, 'Order retrieved successfully');
    } catch (error) {
      logger.error('Error getting order by ID:', error);
      if (error instanceof ValidationError) {
        sendError(res, error.message, error.statusCode);
      } else {
        sendError(res, 'Failed to retrieve order', 500);
      }
    }
  }

  async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit, status, customerName } = req.query;
      const params = {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        status: status as any,
        customerName: customerName as string,
      };

      const orders = await this.orderService.getOrders(params);
      sendPaginatedResponse(res, orders, 'Orders retrieved successfully');
    } catch (error) {
      logger.error('Error getting orders:', error);
      if (error instanceof ValidationError) {
        sendError(res, error.message, error.statusCode);
      } else {
        sendError(res, 'Failed to retrieve orders', 500);
      }
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.updateOrder(id!, req.body);
      sendSuccess(res, order, 'Order updated successfully');
    } catch (error) {
      logger.error('Error updating order:', error);
      if (error instanceof ValidationError) {
        sendError(res, error.message, error.statusCode);
      } else {
        sendError(res, 'Failed to update order', 500);
      }
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.orderService.deleteOrder(id!);
      sendSuccess(res, null, 'Order deleted successfully');
    } catch (error) {
      logger.error('Error deleting order:', error);
      if (error instanceof ValidationError) {
        sendError(res, error.message, error.statusCode);
      } else {
        sendError(res, 'Failed to delete order', 500);
      }
    }
  }

  async getOrdersByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const orders = await this.orderService.getOrdersByStatus(status!);
      sendSuccess(res, orders, 'Orders retrieved successfully');
    } catch (error) {
      logger.error('Error getting orders by status:', error);
      if (error instanceof ValidationError) {
        sendError(res, error.message, error.statusCode);
      } else {
        sendError(res, 'Failed to retrieve orders', 500);
      }
    }
  }

  async getOrderStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.orderService.getOrderStats();
      sendSuccess(res, stats, 'Order statistics retrieved successfully');
    } catch (error) {
      logger.error('Error getting order stats:', error);
      sendError(res, 'Failed to retrieve order statistics', 500);
    }
  }
}
