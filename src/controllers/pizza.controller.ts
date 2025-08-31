import { Request, Response } from 'express';
import { PizzaService } from '../services/pizza.service';
import { sendSuccess, sendError } from '../utils/response';
import { ValidationError } from '../utils/errors';
import logger from '../config/logger';

export class PizzaController {
  constructor(private pizzaService: PizzaService) { }

  async getAvailableBases(req: Request, res: Response): Promise<void> {
    try {
      const bases = await this.pizzaService.getAvailableBases();
      sendSuccess(res, bases, 'Available pizza bases retrieved successfully');
    } catch (error) {
      logger.error('Error getting available bases:', error);
      sendError(res, 'Failed to retrieve pizza bases', 500);
    }
  }

  async getAvailableSizes(req: Request, res: Response): Promise<void> {
    try {
      const sizes = await this.pizzaService.getAvailableSizes();
      sendSuccess(res, sizes, 'Available pizza sizes retrieved successfully');
    } catch (error) {
      logger.error('Error getting available sizes:', error);
      sendError(res, 'Failed to retrieve pizza sizes', 500);
    }
  }

  async getAvailableToppings(req: Request, res: Response): Promise<void> {
    try {
      const toppings = await this.pizzaService.getAvailableToppings();
      sendSuccess(res, toppings, 'Available toppings retrieved successfully');
    } catch (error) {
      logger.error('Error getting available toppings:', error);
      sendError(res, 'Failed to retrieve toppings', 500);
    }
  }

  /// -----------------------------

  // async getBaseById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const base = await this.pizzaService.getBaseById(id);
  //     sendSuccess(res, base, 'Pizza base retrieved successfully');
  //   } catch (error) {
  //     logger.error('Error getting pizza base by ID:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to retrieve pizza base', 500);
  //     }
  //   }
  // }

  // async getSizeById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const size = await this.pizzaService.getSizeById(id);
  //     sendSuccess(res, size, 'Pizza size retrieved successfully');
  //   } catch (error) {
  //     logger.error('Error getting pizza size by ID:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to retrieve pizza size', 500);
  //     }
  //   }
  // }

  // async getToppingById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const topping = await this.pizzaService.getToppingById(id);
  //     sendSuccess(res, topping, 'Topping retrieved successfully');
  //   } catch (error) {
  //     logger.error('Error getting topping by ID:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to retrieve topping', 500);
  //     }
  //   }
  // }

  // async createBase(req: Request, res: Response): Promise<void> {
  //   try {
  //     const base = await this.pizzaService.createBase(req.body);
  //     sendSuccess(res, base, 'Pizza base created successfully', 201);
  //   } catch (error) {
  //     logger.error('Error creating pizza base:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to create pizza base', 500);
  //     }
  //   }
  // }

  // async createSize(req: Request, res: Response): Promise<void> {
  //   try {
  //     const size = await this.pizzaService.createSize(req.body);
  //     sendSuccess(res, size, 'Pizza size created successfully', 201);
  //   } catch (error) {
  //     logger.error('Error creating pizza size:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to create pizza size', 500);
  //     }
  //   }
  // }

  // async createTopping(req: Request, res: Response): Promise<void> {
  //   try {
  //     const topping = await this.pizzaService.createTopping(req.body);
  //     sendSuccess(res, topping, 'Topping created successfully', 201);
  //   } catch (error) {
  //     logger.error('Error creating topping:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to create topping', 500);
  //     }
  //   }
  // }

  // async updateBase(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const base = await this.pizzaService.updateBase(id, req.body);
  //     sendSuccess(res, base, 'Pizza base updated successfully');
  //   } catch (error) {
  //     logger.error('Error updating pizza base:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to update pizza base', 500);
  //     }
  //   }
  // }

  // async updateSize(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const size = await this.pizzaService.updateSize(id, req.body);
  //     sendSuccess(res, size, 'Pizza size updated successfully');
  //   } catch (error) {
  //     logger.error('Error updating pizza size:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to update pizza size', 500);
  //     }
  //   }
  // }

  // async updateTopping(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const topping = await this.pizzaService.updateTopping(id, req.body);
  //     sendSuccess(res, topping, 'Topping updated successfully');
  //   } catch (error) {
  //     logger.error('Error updating topping:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to update topping', 500);
  //     }
  //   }
  // }

  // async deleteBase(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     await this.pizzaService.deleteBase(id);
  //     sendSuccess(res, null, 'Pizza base deleted successfully');
  //   } catch (error) {
  //     logger.error('Error deleting pizza base:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to delete pizza base', 500);
  //     }
  //   }
  // }

  // async deleteSize(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     await this.pizzaService.deleteSize(id);
  //     sendSuccess(res, null, 'Pizza size deleted successfully');
  //   } catch (error) {
  //     logger.error('Error deleting pizza size:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to delete pizza size', 500);
  //     }
  //   }
  // }

  // async deleteTopping(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     await this.pizzaService.deleteTopping(id);
  //     sendSuccess(res, null, 'Topping deleted successfully');
  //   } catch (error) {
  //     logger.error('Error deleting topping:', error);
  //     if (error instanceof ValidationError) {
  //       sendError(res, error.message, error.statusCode);
  //     } else {
  //       sendError(res, 'Failed to delete topping', 500);
  //     }
  //   }
  // }
}
