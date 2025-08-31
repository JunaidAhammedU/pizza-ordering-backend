import { PizzaBaseRepository, PizzaSizeRepository, ToppingRepository } from '../repositories/pizza.repository';
import { PizzaBase, PizzaSize, Topping } from '../types';

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

    async validatePizzaComponents(baseId: string, sizeId: string, toppingIds: string[]): Promise<{
        base: PizzaBase;
        size: PizzaSize;
        toppings: Topping[];
    }> {
        const [base, size, toppings] = await Promise.all([
            this.pizzaBaseRepository.findByIdOrThrow(baseId),
            this.pizzaSizeRepository.findByIdOrThrow(sizeId),
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
