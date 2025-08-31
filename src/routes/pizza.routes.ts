import { Router } from 'express';
import { PizzaController } from '../controllers/pizza.controller';
import { validateBody, validateParams } from '../middleware/validation.middleware';
import { pizzaBaseSchema, pizzaSizeSchema, toppingSchema, idParamSchema } from '../validations';
import { asyncHandler } from '../middleware/error.middleware';

export const createPizzaRoutes = (pizzaController: PizzaController): Router => {
  const router = Router();

  router.get('/bases', asyncHandler(pizzaController.getAvailableBases.bind(pizzaController)));
  router.get('/sizes', asyncHandler(pizzaController.getAvailableSizes.bind(pizzaController)));
  router.get('/toppings', asyncHandler(pizzaController.getAvailableToppings.bind(pizzaController)));

  // router.get('/bases/:id', validateParams(idParamSchema), asyncHandler(pizzaController.getBaseById.bind(pizzaController)));
  // router.get('/sizes/:id', validateParams(idParamSchema), asyncHandler(pizzaController.getSizeById.bind(pizzaController)));
  // router.get('/toppings/:id', validateParams(idParamSchema), asyncHandler(pizzaController.getToppingById.bind(pizzaController)));

  // router.post('/bases', validateBody(pizzaBaseSchema), asyncHandler(pizzaController.createBase.bind(pizzaController)));
  // router.post('/sizes', validateBody(pizzaSizeSchema), asyncHandler(pizzaController.createSize.bind(pizzaController)));
  // router.post('/toppings', validateBody(toppingSchema), asyncHandler(pizzaController.createTopping.bind(pizzaController)));

  // router.put('/bases/:id', validateParams(idParamSchema), validateBody(pizzaBaseSchema.partial()), asyncHandler(pizzaController.updateBase.bind(pizzaController)));
  // router.put('/sizes/:id', validateParams(idParamSchema), validateBody(pizzaSizeSchema.partial()), asyncHandler(pizzaController.updateSize.bind(pizzaController)));
  // router.put('/toppings/:id', validateParams(idParamSchema), validateBody(toppingSchema.partial()), asyncHandler(pizzaController.updateTopping.bind(pizzaController)));

  // router.delete('/bases/:id', validateParams(idParamSchema), asyncHandler(pizzaController.deleteBase.bind(pizzaController)));
  // router.delete('/sizes/:id', validateParams(idParamSchema), asyncHandler(pizzaController.deleteSize.bind(pizzaController)));
  // router.delete('/toppings/:id', validateParams(idParamSchema), asyncHandler(pizzaController.deleteTopping.bind(pizzaController)));

  return router;
};
