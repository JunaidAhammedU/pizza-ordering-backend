"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const response_1 = require("../utils/response");
const errors_1 = require("../utils/errors");
const logger_1 = __importDefault(require("../config/logger"));
class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(req, res) {
        try {
            const order = await this.orderService.createOrder(req.body);
            (0, response_1.sendSuccess)(res, order, 'Order created successfully', 201);
        }
        catch (error) {
            logger_1.default.error('Error creating order:', error);
            if (error instanceof errors_1.ValidationError) {
                (0, response_1.sendError)(res, error.message, error.statusCode);
            }
            else {
                console.error('Error creating order:', error);
            }
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map