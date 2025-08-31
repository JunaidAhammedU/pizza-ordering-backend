"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PizzaController = void 0;
const response_1 = require("../utils/response");
const logger_1 = __importDefault(require("../config/logger"));
class PizzaController {
    pizzaService;
    constructor(pizzaService) {
        this.pizzaService = pizzaService;
    }
    async getAvailableBases(_req, res) {
        try {
            const bases = await this.pizzaService.getAvailableBases();
            (0, response_1.sendSuccess)(res, bases, 'Available pizza bases retrieved successfully');
        }
        catch (error) {
            logger_1.default.error('Error getting available bases:', error);
            (0, response_1.sendError)(res, 'Failed to retrieve pizza bases', 500);
        }
    }
    async getAvailableSizes(_req, res) {
        try {
            const sizes = await this.pizzaService.getAvailableSizes();
            (0, response_1.sendSuccess)(res, sizes, 'Available pizza sizes retrieved successfully');
        }
        catch (error) {
            logger_1.default.error('Error getting available sizes:', error);
            (0, response_1.sendError)(res, 'Failed to retrieve pizza sizes', 500);
        }
    }
    async getAvailableToppings(_req, res) {
        try {
            const toppings = await this.pizzaService.getAvailableToppings();
            (0, response_1.sendSuccess)(res, toppings, 'Available toppings retrieved successfully');
        }
        catch (error) {
            logger_1.default.error('Error getting available toppings:', error);
            (0, response_1.sendError)(res, 'Failed to retrieve toppings', 500);
        }
    }
}
exports.PizzaController = PizzaController;
//# sourceMappingURL=pizza.controller.js.map