import { Request, Response } from 'express';
import { PizzaService } from '../services/pizza.service';
import { sendSuccess, sendError } from '../utils/response';
import logger from '../config/logger';

export class PizzaController {
  constructor(private pizzaService: PizzaService) { }

  async getAvailableBases(_req: Request, res: Response): Promise<void> {
    try {
      const bases = await this.pizzaService.getAvailableBases();
      sendSuccess(res, bases, 'Available pizza bases retrieved successfully');
    } catch (error) {
      logger.error('Error getting available bases:', error);
      sendError(res, 'Failed to retrieve pizza bases', 500);
    }
  }

  async getAvailableSizes(_req: Request, res: Response): Promise<void> {
    try {
      const sizes = await this.pizzaService.getAvailableSizes();
      sendSuccess(res, sizes, 'Available pizza sizes retrieved successfully');
    } catch (error) {
      logger.error('Error getting available sizes:', error);
      sendError(res, 'Failed to retrieve pizza sizes', 500);
    }
  }

  async getAvailableToppings(_req: Request, res: Response): Promise<void> {
    try {
      const toppings = await this.pizzaService.getAvailableToppings();
      sendSuccess(res, toppings, 'Available toppings retrieved successfully');
    } catch (error) {
      logger.error('Error getting available toppings:', error);
      sendError(res, 'Failed to retrieve toppings', 500);
    }
  }
}
