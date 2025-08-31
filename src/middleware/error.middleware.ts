import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { sendError } from '../utils/response';
import logger from '../config/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  if (error instanceof AppError) {
    sendError(res, error.message, error.statusCode);
    return;
  }

  // Handle Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any;

    switch (prismaError.code) {
      case 'P2002':
        sendError(res, 'A record with this unique field already exists', 409);
        break;
      case 'P2025':
        sendError(res, 'Record not found', 404);
        break;
      case 'P2003':
        sendError(res, 'Foreign key constraint failed', 400);
        break;
      default:
        sendError(res, 'Database operation failed', 500);
    }
    return;
  }

  // Handle Zod validation errors
  if (error.name === 'ZodError') {
    sendError(res, 'Validation failed', 400, error.message);
    return;
  }

  // Handle JSON parsing errors
  if (error instanceof SyntaxError && 'body' in error) {
    sendError(res, 'Invalid JSON format', 400);
    return;
  }

  // Default error
  sendError(res, 'Internal server error', 500);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
