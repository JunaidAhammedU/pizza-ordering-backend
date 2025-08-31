import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { Order } from '../types';

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
}
