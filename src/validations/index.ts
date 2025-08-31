import { z } from 'zod';

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

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
