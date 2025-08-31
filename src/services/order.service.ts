import { OrderRepository } from '../repositories/order.repository';
import { PizzaService } from './pizza.service';
import { CreateOrderDto, UpdateOrderDto, OrderQueryParams, PaginatedResponse, OrderResponseDto } from '../types';
import { ValidationError } from '../utils/errors';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private pizzaService: PizzaService,
  ) { }

  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
    for (const item of orderData.items) {
      const toppingIds = item.toppings.map(t => t.toppingId);
      await this.pizzaService.validatePizzaComponents(item.baseId, item.sizeId, toppingIds);
    }

    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of orderData.items) {
      const { base, size, toppings } = await this.pizzaService.validatePizzaComponents(
        item.baseId,
        item.sizeId,
        item.toppings.map(t => t.toppingId),
      );

      const basePrice = Number(base.price);
      const sizePrice = Number(size.price);
      const toppingsPrice = toppings.reduce((sum, topping) => {
        const itemTopping = item.toppings.find(t => t.toppingId === topping.id);
        return sum + (Number(topping.price) * (itemTopping?.quantity || 0));
      }, 0);

      const itemUnitPrice = basePrice + sizePrice + toppingsPrice;
      const itemTotalPrice = itemUnitPrice * item.quantity;
      totalAmount += itemTotalPrice;

      orderItemsData.push({
        baseId: item.baseId,
        sizeId: item.sizeId,
        quantity: item.quantity,
        unitPrice: itemUnitPrice,
        totalPrice: itemTotalPrice,
        notes: item.notes,
        toppings: {
          create: item.toppings.map(topping => ({
            toppingId: topping.toppingId,
            quantity: topping.quantity,
            unitPrice: Number(toppings.find(t => t.id === topping.toppingId)?.price || 0),
            totalPrice: Number(toppings.find(t => t.id === topping.toppingId)?.price || 0) * topping.quantity,
          })),
        },
      });
    }

    // Create order with items
    const order = await this.orderRepository.create({
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      totalAmount,
      notes: orderData.notes,
      orderItems: {
        create: orderItemsData,
      },
    });

    return await this.getOrderById(order.id);
  }

  async getOrderById(id: string): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findWithItemsOrThrow(id);
    return this.mapOrderToResponseDto(order);
  }

  async getOrders(params: OrderQueryParams): Promise<PaginatedResponse<OrderResponseDto>> {
    const paginatedOrders = await this.orderRepository.findPaginated(params);

    return {
      data: paginatedOrders.data.map(order => this.mapOrderToResponseDto(order)),
      pagination: paginatedOrders.pagination,
    };
  }

  async updateOrder(id: string, updateData: UpdateOrderDto): Promise<OrderResponseDto> {
    const order = await this.orderRepository.updateStatus(id, updateData.status!);
    return this.mapOrderToResponseDto(order);
  }

  async deleteOrder(id: string): Promise<void> {
    await this.orderRepository.softDelete(id);
  }

  async getOrdersByStatus(status: string): Promise<OrderResponseDto[]> {
    const orders = await this.orderRepository.findByStatus(status as any);
    return orders.map(order => this.mapOrderToResponseDto(order));
  }

  async getOrderStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    preparing: number;
    ready: number;
    delivered: number;
    cancelled: number;
  }> {
    return await this.orderRepository.getOrderStats();
  }

  private mapOrderToResponseDto(order: any): OrderResponseDto {
    return {
      id: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      status: order.status,
      totalAmount: Number(order.totalAmount),
      notes: order.notes,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderItems: order.orderItems.map((item: any) => ({
        id: item.id,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
        notes: item.notes,
        base: {
          id: item.base.id,
          name: item.base.name,
          description: item.base.description,
          price: Number(item.base.price),
          isAvailable: item.base.isAvailable,
        },
        size: {
          id: item.size.id,
          name: item.size.name,
          inches: item.size.inches,
          price: Number(item.size.price),
          isAvailable: item.size.isAvailable,
        },
        toppings: item.toppings.map((topping: any) => ({
          id: topping.id,
          quantity: topping.quantity,
          unitPrice: Number(topping.unitPrice),
          totalPrice: Number(topping.totalPrice),
          topping: {
            id: topping.topping.id,
            name: topping.topping.name,
            description: topping.topping.description,
            price: Number(topping.topping.price),
            isAvailable: topping.topping.isAvailable,
          },
        })),
      })),
    };
  }
}
