"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./config/logger"));
const error_middleware_1 = require("./middleware/error.middleware");
const pizza_routes_1 = require("./routes/pizza.routes");
const order_routes_1 = require("./routes/order.routes");
const pizza_controller_1 = require("./controllers/pizza.controller");
const order_controller_1 = require("./controllers/order.controller");
const pizza_service_1 = require("./services/pizza.service");
const order_service_1 = require("./services/order.service");
const pizza_repository_1 = require("./repositories/pizza.repository");
const order_repository_1 = require("./repositories/order.repository");
const database_1 = require("./config/database");
dotenv_1.default.config();
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddleware() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)({
            origin: process.env["NODE_ENV"] === 'production'
                ? process.env["ALLOWED_ORIGINS"]?.split(',')
                : true,
            credentials: true,
        }));
        const limiter = (0, express_rate_limit_1.default)({
            windowMs: Number(process.env["RATE_LIMIT_WINDOW_MS"]) || 15 * 60 * 1000,
            max: Number(process.env["RATE_LIMIT_MAX_REQUESTS"]) || 100,
            message: {
                success: false,
                message: 'Too many requests from this IP, please try again later.',
            },
        });
        this.app.use('/api/', limiter);
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use((0, morgan_1.default)('combined', {
            stream: {
                write: (message) => {
                    logger_1.default.info(message.trim());
                },
            },
        }));
        this.app.use((req, _res, next) => {
            logger_1.default.info(`${req.method} ${req.originalUrl}`, {
                ip: req.ip,
                userAgent: req.get('User-Agent'),
            });
            next();
        });
    }
    initializeRoutes() {
        const pizzaBaseRepository = new pizza_repository_1.PizzaBaseRepository(database_1.prisma);
        const pizzaSizeRepository = new pizza_repository_1.PizzaSizeRepository(database_1.prisma);
        const toppingRepository = new pizza_repository_1.ToppingRepository(database_1.prisma);
        const orderRepository = new order_repository_1.OrderRepository(database_1.prisma);
        const pizzaService = new pizza_service_1.PizzaService(pizzaBaseRepository, pizzaSizeRepository, toppingRepository);
        const orderService = new order_service_1.OrderService(orderRepository, pizzaService);
        const pizzaController = new pizza_controller_1.PizzaController(pizzaService);
        const orderController = new order_controller_1.OrderController(orderService);
        this.app.use('/api/pizza', (0, pizza_routes_1.createPizzaRoutes)(pizzaController));
        this.app.use('/api/orders', (0, order_routes_1.createOrderRoutes)(orderController));
        this.app.get('/api', (_req, res) => {
            res.json({
                success: true,
                message: 'Pizza Ordering API',
                version: '1.0.0',
                endpoints: {
                    pizza: {
                        bases: 'GET /api/pizza/bases',
                        sizes: 'GET /api/pizza/sizes',
                        toppings: 'GET /api/pizza/toppings',
                    },
                    orders: {
                        create: 'POST /api/orders',
                    },
                },
            });
        });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.notFoundHandler);
        this.app.use(error_middleware_1.errorHandler);
    }
    async start() {
        const port = process.env["PORT"] || 3000;
        this.app.listen(port, () => {
            logger_1.default.info(`Server is running on port ${port}`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map