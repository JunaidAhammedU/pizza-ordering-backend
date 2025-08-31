import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { Order } from '../types';
export declare class OrderRepository extends BaseRepository<Order> {
    constructor(prisma: PrismaClient);
    findWithItems(id: string): Promise<Order | null>;
    findWithItemsOrThrow(id: string): Promise<Order>;
}
//# sourceMappingURL=order.repository.d.ts.map