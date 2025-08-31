"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PizzaService = void 0;
class PizzaService {
    pizzaBaseRepository;
    pizzaSizeRepository;
    toppingRepository;
    constructor(pizzaBaseRepository, pizzaSizeRepository, toppingRepository) {
        this.pizzaBaseRepository = pizzaBaseRepository;
        this.pizzaSizeRepository = pizzaSizeRepository;
        this.toppingRepository = toppingRepository;
    }
    async getAvailableBases() {
        return await this.pizzaBaseRepository.findAvailable();
    }
    async getAvailableSizes() {
        return await this.pizzaSizeRepository.findAvailable();
    }
    async getAvailableToppings() {
        return await this.toppingRepository.findAvailable();
    }
    async validatePizzaComponents(baseId, sizeId, toppingIds) {
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
exports.PizzaService = PizzaService;
//# sourceMappingURL=pizza.service.js.map