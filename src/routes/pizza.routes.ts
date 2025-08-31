import { Router } from 'express';
import { PizzaController } from '../controllers/pizza.controller';
import { asyncHandler } from '../middleware/error.middleware';

export const createPizzaRoutes = (pizzaController: PizzaController): Router => {
  const router = Router();

  router.get('/bases', asyncHandler(pizzaController.getAvailableBases.bind(pizzaController)));
  router.get('/sizes', asyncHandler(pizzaController.getAvailableSizes.bind(pizzaController)));
  router.get('/toppings', asyncHandler(pizzaController.getAvailableToppings.bind(pizzaController)));

  return router;
};
