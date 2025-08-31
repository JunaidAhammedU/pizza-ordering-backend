import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors';

export abstract class BaseRepository<T> {
    protected prisma: PrismaClient;
    protected modelName: string;

    constructor(prisma: PrismaClient, modelName: string) {
        this.prisma = prisma;
        this.modelName = modelName;
    }

    async findByIdOrThrow(id: string): Promise<T> {
        const result = await (this.prisma as any)[this.modelName].findUnique({
            where: { id },
        });
        if (!result) {
            throw new NotFoundError(`${this.modelName} with ID ${id} not found`);
        }
        return result;
    }

    async create(data: any): Promise<T> {
        try {
            const result = await (this.prisma as any)[this.modelName].create({
                data,
            });
            return result;
        } catch (error) {
            throw new Error(`Error creating ${this.modelName}: ${error}`);
        }
    }
}
