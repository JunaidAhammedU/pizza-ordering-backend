import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { PizzaBase, PizzaSize, Topping } from '../types';

export class PizzaBaseRepository extends BaseRepository<PizzaBase> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'pizzaBase');
  }

  async findAvailable(): Promise<PizzaBase[]> {
    try {
      return await this.prisma.pizzaBase.findMany({
        where: { isAvailable: true },
        orderBy: { name: 'asc' },
      });
    } catch (error) {
      throw new Error(`Error finding available pizza bases: ${error}`);
    }
  }
}

export class PizzaSizeRepository extends BaseRepository<PizzaSize> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'pizzaSize');
  }

  async findAvailable(): Promise<PizzaSize[]> {
    try {
      return await this.prisma.pizzaSize.findMany({
        where: { isAvailable: true },
        orderBy: { inches: 'asc' },
      });
    } catch (error) {
      throw new Error(`Error finding available pizza sizes: ${error}`);
    }
  }
}

export class ToppingRepository extends BaseRepository<Topping> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'topping');
  }

  async findAvailable(): Promise<Topping[]> {
    try {
      return await this.prisma.topping.findMany({
        where: { isAvailable: true },
        orderBy: { name: 'asc' },
      });
    } catch (error) {
      throw new Error(`Error finding available toppings: ${error}`);
    }
  }

  async findByIds(ids: string[]): Promise<Topping[]> {
    try {
      return await this.prisma.topping.findMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      throw new Error(`Error finding toppings by IDs: ${error}`);
    }
  }
}
