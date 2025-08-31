"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const response_1 = require("../utils/response");
const logger_1 = __importDefault(require("../config/logger"));
const errorHandler = (error, req, res, _next) => {
    logger_1.default.error('Error occurred:', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
    });
    if (error instanceof errors_1.AppError) {
        (0, response_1.sendError)(res, error.message, error.statusCode);
        return;
    }
    if (error.name === 'PrismaClientKnownRequestError') {
        const prismaError = error;
        switch (prismaError.code) {
            case 'P2002':
                (0, response_1.sendError)(res, 'A record with this unique field already exists', 409);
                break;
            case 'P2025':
                (0, response_1.sendError)(res, 'Record not found', 404);
                break;
            case 'P2003':
                (0, response_1.sendError)(res, 'Foreign key constraint failed', 400);
                break;
            default:
                (0, response_1.sendError)(res, 'Database operation failed', 500);
        }
        return;
    }
    if (error.name === 'ZodError') {
        (0, response_1.sendError)(res, 'Validation failed', 400, error.message);
        return;
    }
    if (error instanceof SyntaxError && 'body' in error) {
        (0, response_1.sendError)(res, 'Invalid JSON format', 400);
        return;
    }
    (0, response_1.sendError)(res, 'Internal server error', 500);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    (0, response_1.sendError)(res, `Route ${req.originalUrl} not found`, 404);
};
exports.notFoundHandler = notFoundHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=error.middleware.js.map