import { PrismaClient } from '@prisma/client';
export declare abstract class BaseRepository<T> {
    protected prisma: PrismaClient;
    protected modelName: string;
    constructor(prisma: PrismaClient, modelName: string);
    findByIdOrThrow(id: string): Promise<T>;
    create(data: any): Promise<T>;
}
//# sourceMappingURL=base.repository.d.ts.map