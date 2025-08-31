import { z } from 'zod';
import { OrderStatus } from '@prisma/client';

// Base validation schemas
export const pizzaBaseSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  isAvailable: z.boolean().default(true),
});

export const pizzaSizeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  inches: z.number().int().positive('Inches must be a positive integer'),
  price: z.number().positive('Price must be positive'),
  isAvailable: z.boolean().default(true),
});

export const toppingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  isAvailable: z.boolean().default(true),
});

// Order validation schemas
export const createOrderItemToppingSchema = z.object({
  toppingId: z.string().cuid('Invalid topping ID'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

export const createOrderItemSchema = z.object({
  baseId: z.string().cuid('Invalid base ID'),
  sizeId: z.string().cuid('Invalid size ID'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  notes: z.string().optional(),
  toppings: z.array(createOrderItemToppingSchema).default([]),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required').max(100, 'Customer name too long'),
  customerEmail: z.string().email('Invalid email format').optional(),
  customerPhone: z.string().min(10, 'Phone number too short').max(15, 'Phone number too long').optional(),
  notes: z.string().optional(),
  items: z.array(createOrderItemSchema).min(1, 'At least one item is required'),
});

export const updateOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  notes: z.string().optional(),
});

// Query parameter validation schemas
export const orderQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  status: z.nativeEnum(OrderStatus).optional(),
  customerName: z.string().optional(),
});

// ID validation schemas
export const idParamSchema = z.object({
  id: z.string().cuid('Invalid ID format'),
});

// Export types
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
export type OrderQueryInput = z.infer<typeof orderQuerySchema>;
export type CreatePizzaBaseInput = z.infer<typeof pizzaBaseSchema>;
export type CreatePizzaSizeInput = z.infer<typeof pizzaSizeSchema>;
export type CreateToppingInput = z.infer<typeof toppingSchema>;
