import { PrismaClient, OrderStatus } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { Order, OrderQueryParams, PaginatedResponse } from '../types';

export class OrderRepository extends BaseRepository<Order> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'order');
  }

  async findWithItems(id: string): Promise<Order | null> {
    try {
      return await this.prisma.order.findUnique({
        where: { id, isDeleted: false },
        include: {
          orderItems: {
            include: {
              base: true,
              size: true,
              toppings: {
                include: {
                  topping: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error finding order with items: ${error}`);
    }
  }

  async findWithItemsOrThrow(id: string): Promise<Order> {
    const order = await this.findWithItems(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findPaginated(params: OrderQueryParams): Promise<PaginatedResponse<Order>> {
    const { page = 1, limit = 10, status, customerName } = params;
    const skip = (page - 1) * limit;

    try {
      const where: any = { isDeleted: false };
      
      if (status) {
        where.status = status;
      }
      
      if (customerName) {
        where.customerName = {
          contains: customerName,
          mode: 'insensitive',
        };
      }

      const [orders, total] = await Promise.all([
        this.prisma.order.findMany({
          where,
          include: {
            orderItems: {
              include: {
                base: true,
                size: true,
                toppings: {
                  include: {
                    topping: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        this.prisma.order.count({ where }),
      ]);

      return {
        data: orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Error finding paginated orders: ${error}`);
    }
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    try {
      return await this.prisma.order.findMany({
        where: { status, isDeleted: false },
        include: {
          orderItems: {
            include: {
              base: true,
              size: true,
              toppings: {
                include: {
                  topping: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new Error(`Error finding orders by status: ${error}`);
    }
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    try {
      return await this.prisma.order.update({
        where: { id, isDeleted: false },
        data: { status },
        include: {
          orderItems: {
            include: {
              base: true,
              size: true,
              toppings: {
                include: {
                  topping: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error updating order status: ${error}`);
    }
  }

  async softDelete(id: string): Promise<Order> {
    try {
      return await this.prisma.order.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new Error(`Error soft deleting order: ${error}`);
    }
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
    try {
      const stats = await this.prisma.order.groupBy({
        by: ['status'],
        where: { isDeleted: false },
        _count: {
          status: true,
        },
      });

      const result = {
        total: 0,
        pending: 0,
        confirmed: 0,
        preparing: 0,
        ready: 0,
        delivered: 0,
        cancelled: 0,
      };

      stats.forEach((stat) => {
        const count = stat._count.status;
        result.total += count;
        result[stat.status.toLowerCase() as keyof typeof result] = count;
      });

      return result;
    } catch (error) {
      throw new Error(`Error getting order stats: ${error}`);
    }
  }
}
