import { PizzaBaseRepository, PizzaSizeRepository, ToppingRepository } from '../repositories/pizza.repository';
import { PizzaBase, PizzaSize, Topping } from '../types';
export declare class PizzaService {
    private pizzaBaseRepository;
    private pizzaSizeRepository;
    private toppingRepository;
    constructor(pizzaBaseRepository: PizzaBaseRepository, pizzaSizeRepository: PizzaSizeRepository, toppingRepository: ToppingRepository);
    getAvailableBases(): Promise<PizzaBase[]>;
    getAvailableSizes(): Promise<PizzaSize[]>;
    getAvailableToppings(): Promise<Topping[]>;
    validatePizzaComponents(baseId: string, sizeId: string, toppingIds: string[]): Promise<{
        base: PizzaBase;
        size: PizzaSize;
        toppings: Topping[];
    }>;
}
//# sourceMappingURL=pizza.service.d.ts.map