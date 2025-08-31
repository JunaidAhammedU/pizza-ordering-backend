import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors';

export abstract class BaseRepository<T> {
    protected prisma: PrismaClient;
    protected modelName: string;

    constructor(prisma: PrismaClient, modelName: string) {
        this.prisma = prisma;
        this.modelName = modelName;
    }

    async findById(id: string): Promise<T | null> {
        try {
            const result = await (this.prisma as any)[this.modelName].findUnique({
                where: { id },
            });
            return result;
        } catch (error) {
            throw new Error(`Error finding ${this.modelName} by ID: ${error}`);
        }
    }

    async findByIdOrThrow(id: string): Promise<T> {
        const result = await this.findById(id);
        if (!result) {
            throw new NotFoundError(`${this.modelName} with ID ${id} not found`);
        }
        return result;
    }

    async findAll(): Promise<T[]> {
        try {
            const result = await (this.prisma as any)[this.modelName].findMany();
            return result;
        } catch (error) {
            throw new Error(`Error finding all ${this.modelName}: ${error}`);
        }
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

    async update(id: string, data: any): Promise<T> {
        try {
            const result = await (this.prisma as any)[this.modelName].update({
                where: { id },
                data,
            });
            return result;
        } catch (error) {
            throw new Error(`Error updating ${this.modelName}: ${error}`);
        }
    }

    async delete(id: string): Promise<T> {
        try {
            const result = await (this.prisma as any)[this.modelName].delete({
                where: { id },
            });
            return result;
        } catch (error) {
            throw new Error(`Error deleting ${this.modelName}: ${error}`);
        }
    }

    async softDelete(id: string): Promise<T> {
        try {
            const result = await (this.prisma as any)[this.modelName].update({
                where: { id },
                data: { isDeleted: true },
            });
            return result;
        } catch (error) {
            throw new Error(`Error soft deleting ${this.modelName}: ${error}`);
        }
    }
}
