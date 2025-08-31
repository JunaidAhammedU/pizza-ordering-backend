"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPizzaRoutes = void 0;
const express_1 = require("express");
const error_middleware_1 = require("../middleware/error.middleware");
const createPizzaRoutes = (pizzaController) => {
    const router = (0, express_1.Router)();
    router.get('/bases', (0, error_middleware_1.asyncHandler)(pizzaController.getAvailableBases.bind(pizzaController)));
    router.get('/sizes', (0, error_middleware_1.asyncHandler)(pizzaController.getAvailableSizes.bind(pizzaController)));
    router.get('/toppings', (0, error_middleware_1.asyncHandler)(pizzaController.getAvailableToppings.bind(pizzaController)));
    return router;
};
exports.createPizzaRoutes = createPizzaRoutes;
//# sourceMappingURL=pizza.routes.js.map