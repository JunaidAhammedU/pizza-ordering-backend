import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { validateBody } from '../middleware/validation.middleware';
import { createOrderSchema } from '../validations';
import { asyncHandler } from '../middleware/error.middleware';

export const createOrderRoutes = (orderController: OrderController): Router => {
  const router = Router();

  router.post('/', validateBody(createOrderSchema), asyncHandler(orderController.createOrder.bind(orderController)));

  return router;
};
