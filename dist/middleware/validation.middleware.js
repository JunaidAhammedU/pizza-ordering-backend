"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateBody = exports.validateRequest = void 0;
const zod_1 = require("zod");
const errors_1 = require("../utils/errors");
const validateRequest = (schema) => {
    return (req, _res, next) => {
        try {
            const validatedData = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            req.body = validatedData.body;
            req.query = validatedData.query;
            req.params = validatedData.params;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessage = error.errors.map(err => err.message).join(', ');
                next(new errors_1.ValidationError(errorMessage));
            }
            else {
                next(new errors_1.ValidationError('Invalid request data'));
            }
        }
    };
};
exports.validateRequest = validateRequest;
const validateBody = (schema) => {
    return (req, _res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessage = error.errors.map(err => err.message).join(', ');
                next(new errors_1.ValidationError(errorMessage));
            }
            else {
                next(new errors_1.ValidationError('Invalid request body'));
            }
        }
    };
};
exports.validateBody = validateBody;
const validateQuery = (schema) => {
    return (req, _res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessage = error.errors.map(err => err.message).join(', ');
                next(new errors_1.ValidationError(errorMessage));
            }
            else {
                next(new errors_1.ValidationError('Invalid query parameters'));
            }
        }
    };
};
exports.validateQuery = validateQuery;
const validateParams = (schema) => {
    return (req, _res, next) => {
        try {
            req.params = schema.parse(req.params);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessage = error.errors.map(err => err.message).join(', ');
                next(new errors_1.ValidationError(errorMessage));
            }
            else {
                next(new errors_1.ValidationError('Invalid path parameters'));
            }
        }
    };
};
exports.validateParams = validateParams;
//# sourceMappingURL=validation.middleware.js.map