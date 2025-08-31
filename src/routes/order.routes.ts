import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { validateBody, validateParams, validateQuery } from '../middleware/validation.middleware';
import { createOrderSchema, updateOrderSchema, orderQuerySchema, idParamSchema } from '../validations';
import { asyncHandler } from '../middleware/error.middleware';

export const createOrderRoutes = (orderController: OrderController): Router => {
  const router = Router();

  // Create order
  router.post('/', validateBody(createOrderSchema), asyncHandler(orderController.createOrder.bind(orderController)));

  // Get orders with pagination and filtering
  router.get('/', validateQuery(orderQuerySchema), asyncHandler(orderController.getOrders.bind(orderController)));

  // Get order by ID
  router.get('/:id', validateParams(idParamSchema), asyncHandler(orderController.getOrderById.bind(orderController)));

  // Update order status
  router.put('/:id', validateParams(idParamSchema), validateBody(updateOrderSchema), asyncHandler(orderController.updateOrder.bind(orderController)));

  // Delete order (soft delete)
  router.delete('/:id', validateParams(idParamSchema), asyncHandler(orderController.deleteOrder.bind(orderController)));

  // Get orders by status
  router.get('/status/:status', asyncHandler(orderController.getOrdersByStatus.bind(orderController)));

  // Get order statistics
  router.get('/stats/overview', asyncHandler(orderController.getOrderStats.bind(orderController)));

  return router;
};
