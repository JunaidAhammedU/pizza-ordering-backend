"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = exports.createOrderItemSchema = exports.createOrderItemToppingSchema = void 0;
const zod_1 = require("zod");
exports.createOrderItemToppingSchema = zod_1.z.object({
    toppingId: zod_1.z.string().cuid('Invalid topping ID'),
    quantity: zod_1.z.number().int().positive('Quantity must be a positive integer'),
});
exports.createOrderItemSchema = zod_1.z.object({
    baseId: zod_1.z.string().cuid('Invalid base ID'),
    sizeId: zod_1.z.string().cuid('Invalid size ID'),
    quantity: zod_1.z.number().int().positive('Quantity must be a positive integer'),
    notes: zod_1.z.string().optional(),
    toppings: zod_1.z.array(exports.createOrderItemToppingSchema).default([]),
});
exports.createOrderSchema = zod_1.z.object({
    customerName: zod_1.z.string().min(1, 'Customer name is required').max(100, 'Customer name too long'),
    customerEmail: zod_1.z.string().email('Invalid email format').optional(),
    customerPhone: zod_1.z.string().min(10, 'Phone number too short').max(15, 'Phone number too long').optional(),
    notes: zod_1.z.string().optional(),
    items: zod_1.z.array(exports.createOrderItemSchema).min(1, 'At least one item is required'),
});
//# sourceMappingURL=index.js.map