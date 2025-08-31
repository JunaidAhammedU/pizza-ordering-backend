"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderRoutes = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../middleware/validation.middleware");
const validations_1 = require("../validations");
const error_middleware_1 = require("../middleware/error.middleware");
const createOrderRoutes = (orderController) => {
    const router = (0, express_1.Router)();
    router.post('/', (0, validation_middleware_1.validateBody)(validations_1.createOrderSchema), (0, error_middleware_1.asyncHandler)(orderController.createOrder.bind(orderController)));
    return router;
};
exports.createOrderRoutes = createOrderRoutes;
//# sourceMappingURL=order.routes.js.map