import { z } from 'zod';
export declare const createOrderItemToppingSchema: z.ZodObject<{
    toppingId: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    toppingId: string;
}, {
    quantity: number;
    toppingId: string;
}>;
export declare const createOrderItemSchema: z.ZodObject<{
    baseId: z.ZodString;
    sizeId: z.ZodString;
    quantity: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
    toppings: z.ZodDefault<z.ZodArray<z.ZodObject<{
        toppingId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        toppingId: string;
    }, {
        quantity: number;
        toppingId: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    toppings: {
        quantity: number;
        toppingId: string;
    }[];
    baseId: string;
    sizeId: string;
    quantity: number;
    notes?: string | undefined;
}, {
    baseId: string;
    sizeId: string;
    quantity: number;
    toppings?: {
        quantity: number;
        toppingId: string;
    }[] | undefined;
    notes?: string | undefined;
}>;
export declare const createOrderSchema: z.ZodObject<{
    customerName: z.ZodString;
    customerEmail: z.ZodOptional<z.ZodString>;
    customerPhone: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        baseId: z.ZodString;
        sizeId: z.ZodString;
        quantity: z.ZodNumber;
        notes: z.ZodOptional<z.ZodString>;
        toppings: z.ZodDefault<z.ZodArray<z.ZodObject<{
            toppingId: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            toppingId: string;
        }, {
            quantity: number;
            toppingId: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        toppings: {
            quantity: number;
            toppingId: string;
        }[];
        baseId: string;
        sizeId: string;
        quantity: number;
        notes?: string | undefined;
    }, {
        baseId: string;
        sizeId: string;
        quantity: number;
        toppings?: {
            quantity: number;
            toppingId: string;
        }[] | undefined;
        notes?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    customerName: string;
    items: {
        toppings: {
            quantity: number;
            toppingId: string;
        }[];
        baseId: string;
        sizeId: string;
        quantity: number;
        notes?: string | undefined;
    }[];
    customerEmail?: string | undefined;
    customerPhone?: string | undefined;
    notes?: string | undefined;
}, {
    customerName: string;
    items: {
        baseId: string;
        sizeId: string;
        quantity: number;
        toppings?: {
            quantity: number;
            toppingId: string;
        }[] | undefined;
        notes?: string | undefined;
    }[];
    customerEmail?: string | undefined;
    customerPhone?: string | undefined;
    notes?: string | undefined;
}>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
//# sourceMappingURL=index.d.ts.map