import { PizzaBaseRepository, PizzaSizeRepository, ToppingRepository } from '../repositories/pizza.repository';
import { PizzaBase, PizzaSize, Topping } from '../types';
import { ConflictError } from '../utils/errors';

export class PizzaService {
    constructor(
        private pizzaBaseRepository: PizzaBaseRepository,
        private pizzaSizeRepository: PizzaSizeRepository,
        private toppingRepository: ToppingRepository,
    ) { }

    async getAvailableBases(): Promise<PizzaBase[]> {
        return await this.pizzaBaseRepository.findAvailable();
    }

    async getAvailableSizes(): Promise<PizzaSize[]> {
        return await this.pizzaSizeRepository.findAvailable();
    }

    async getAvailableToppings(): Promise<Topping[]> {
        return await this.toppingRepository.findAvailable();
    }

    async getBaseById(id: string): Promise<PizzaBase> {
        return await this.pizzaBaseRepository.findByIdOrThrow(id);
    }

    async getSizeById(id: string): Promise<PizzaSize> {
        return await this.pizzaSizeRepository.findByIdOrThrow(id);
    }

    async getToppingById(id: string): Promise<Topping> {
        return await this.toppingRepository.findByIdOrThrow(id);
    }

    async createBase(data: { name: string; description?: string; price: number; isAvailable?: boolean }): Promise<PizzaBase> {
        const existingBase = await this.pizzaBaseRepository.findByName(data.name);
        if (existingBase) {
            throw new ConflictError(`Pizza base with name '${data.name}' already exists`);
        }

        return await this.pizzaBaseRepository.create(data);
    }

    async createSize(data: { name: string; inches: number; price: number; isAvailable?: boolean }): Promise<PizzaSize> {
        const existingSize = await this.pizzaSizeRepository.findByName(data.name);
        if (existingSize) {
            throw new ConflictError(`Pizza size with name '${data.name}' already exists`);
        }

        return await this.pizzaSizeRepository.create(data);
    }

    async createTopping(data: { name: string; description?: string; price: number; isAvailable?: boolean }): Promise<Topping> {
        const existingTopping = await this.toppingRepository.findByName(data.name);
        if (existingTopping) {
            throw new ConflictError(`Topping with name '${data.name}' already exists`);
        }

        return await this.toppingRepository.create(data);
    }

    async updateBase(id: string, data: Partial<PizzaBase>): Promise<PizzaBase> {
        if (data.name) {
            const existingBase = await this.pizzaBaseRepository.findByName(data.name);
            if (existingBase && existingBase.id !== id) {
                throw new ConflictError(`Pizza base with name '${data.name}' already exists`);
            }
        }

        return await this.pizzaBaseRepository.update(id, data);
    }

    async updateSize(id: string, data: Partial<PizzaSize>): Promise<PizzaSize> {
        if (data.name) {
            const existingSize = await this.pizzaSizeRepository.findByName(data.name);
            if (existingSize && existingSize.id !== id) {
                throw new ConflictError(`Pizza size with name '${data.name}' already exists`);
            }
        }

        return await this.pizzaSizeRepository.update(id, data);
    }

    async updateTopping(id: string, data: Partial<Topping>): Promise<Topping> {
        if (data.name) {
            const existingTopping = await this.toppingRepository.findByName(data.name);
            if (existingTopping && existingTopping.id !== id) {
                throw new ConflictError(`Topping with name '${data.name}' already exists`);
            }
        }

        return await this.toppingRepository.update(id, data);
    }

    async deleteBase(id: string): Promise<PizzaBase> {
        return await this.pizzaBaseRepository.delete(id);
    }

    async deleteSize(id: string): Promise<PizzaSize> {
        return await this.pizzaSizeRepository.delete(id);
    }

    async deleteTopping(id: string): Promise<Topping> {
        return await this.toppingRepository.delete(id);
    }

    async validatePizzaComponents(baseId: string, sizeId: string, toppingIds: string[]): Promise<{
        base: PizzaBase;
        size: PizzaSize;
        toppings: Topping[];
    }> {
        const [base, size, toppings] = await Promise.all([
            this.getBaseById(baseId),
            this.getSizeById(sizeId),
            toppingIds.length > 0 ? this.toppingRepository.findByIds(toppingIds) : Promise.resolve([]),
        ]);

        if (!base.isAvailable) {
            throw new Error('Selected pizza base is not available');
        }

        if (!size.isAvailable) {
            throw new Error('Selected pizza size is not available');
        }

        const unavailableToppings = toppings.filter(topping => !topping.isAvailable);
        if (unavailableToppings.length > 0) {
            throw new Error(`Selected toppings are not available: ${unavailableToppings.map(t => t.name).join(', ')}`);
        }

        if (toppings.length !== toppingIds.length) {
            throw new Error('Some selected toppings were not found');
        }

        return { base, size, toppings };
    }
}
