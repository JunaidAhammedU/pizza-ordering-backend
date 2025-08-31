import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
export declare const validateRequest: (schema: z.ZodSchema) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const validateBody: (schema: z.ZodSchema) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const validateQuery: (schema: z.ZodSchema) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const validateParams: (schema: z.ZodSchema) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.middleware.d.ts.map