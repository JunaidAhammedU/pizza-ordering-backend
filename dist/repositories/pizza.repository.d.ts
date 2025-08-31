import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { PizzaBase, PizzaSize, Topping } from '../types';
export declare class PizzaBaseRepository extends BaseRepository<PizzaBase> {
    constructor(prisma: PrismaClient);
    findAvailable(): Promise<PizzaBase[]>;
}
export declare class PizzaSizeRepository extends BaseRepository<PizzaSize> {
    constructor(prisma: PrismaClient);
    findAvailable(): Promise<PizzaSize[]>;
}
export declare class ToppingRepository extends BaseRepository<Topping> {
    constructor(prisma: PrismaClient);
    findAvailable(): Promise<Topping[]>;
    findByIds(ids: string[]): Promise<Topping[]>;
}
//# sourceMappingURL=pizza.repository.d.ts.map