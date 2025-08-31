"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToppingRepository = exports.PizzaSizeRepository = exports.PizzaBaseRepository = void 0;
const base_repository_1 = require("./base.repository");
class PizzaBaseRepository extends base_repository_1.BaseRepository {
    constructor(prisma) {
        super(prisma, 'pizzaBase');
    }
    async findAvailable() {
        try {
            return await this.prisma.pizzaBase.findMany({
                where: { isAvailable: true },
                orderBy: { name: 'asc' },
            });
        }
        catch (error) {
            throw new Error(`Error finding available pizza bases: ${error}`);
        }
    }
}
exports.PizzaBaseRepository = PizzaBaseRepository;
class PizzaSizeRepository extends base_repository_1.BaseRepository {
    constructor(prisma) {
        super(prisma, 'pizzaSize');
    }
    async findAvailable() {
        try {
            return await this.prisma.pizzaSize.findMany({
                where: { isAvailable: true },
                orderBy: { inches: 'asc' },
            });
        }
        catch (error) {
            throw new Error(`Error finding available pizza sizes: ${error}`);
        }
    }
}
exports.PizzaSizeRepository = PizzaSizeRepository;
class ToppingRepository extends base_repository_1.BaseRepository {
    constructor(prisma) {
        super(prisma, 'topping');
    }
    async findAvailable() {
        try {
            return await this.prisma.topping.findMany({
                where: { isAvailable: true },
                orderBy: { name: 'asc' },
            });
        }
        catch (error) {
            throw new Error(`Error finding available toppings: ${error}`);
        }
    }
    async findByIds(ids) {
        try {
            return await this.prisma.topping.findMany({
                where: { id: { in: ids } },
            });
        }
        catch (error) {
            throw new Error(`Error finding toppings by IDs: ${error}`);
        }
    }
}
exports.ToppingRepository = ToppingRepository;
//# sourceMappingURL=pizza.repository.js.map