import { OrderStatus } from '@prisma/client';

// Base types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pizza Base types
export interface PizzaBase extends BaseEntity {
  name: string;
  description?: string | null;
  price: number;
  isAvailable: boolean;
}

// Pizza Size types
export interface PizzaSize extends BaseEntity {
  name: string;
  inches: number;
  price: number;
  isAvailable: boolean;
}

// Topping types
export interface Topping extends BaseEntity {
  name: string;
  description?: string | null;
  price: number;
  isAvailable: boolean;
}

// Order types
export interface Order extends BaseEntity {
  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
  status: OrderStatus;
  totalAmount: number;
  notes?: string | null;
  isDeleted: boolean;
  orderItems: OrderItem[];
}

// Order Item types
export interface OrderItem extends BaseEntity {
  orderId: string;
  baseId: string;
  sizeId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string | null;
  base: PizzaBase;
  size: PizzaSize;
  toppings: OrderItemTopping[];
}

// Order Item Topping types
export interface OrderItemTopping extends BaseEntity {
  orderItemId: string;
  toppingId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  topping: Topping;
}

// DTOs for requests
export interface CreateOrderDto {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
  items: CreateOrderItemDto[];
}

export interface CreateOrderItemDto {
  baseId: string;
  sizeId: string;
  quantity: number;
  notes?: string;
  toppings: CreateOrderItemToppingDto[];
}

export interface CreateOrderItemToppingDto {
  toppingId: string;
  quantity: number;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  notes?: string;
}

// DTOs for responses
export interface OrderResponseDto {
  id: string;
  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
  status: OrderStatus;
  totalAmount: number;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItemResponseDto[];
}

export interface OrderItemResponseDto {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string | null;
  base: PizzaBaseResponseDto;
  size: PizzaSizeResponseDto;
  toppings: OrderItemToppingResponseDto[];
}

export interface OrderItemToppingResponseDto {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  topping: ToppingResponseDto;
}

export interface PizzaBaseResponseDto {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  isAvailable: boolean;
}

export interface PizzaSizeResponseDto {
  id: string;
  name: string;
  inches: number;
  price: number;
  isAvailable: boolean;
}

export interface ToppingResponseDto {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  isAvailable: boolean;
}

// Query types
export interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  customerName?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
