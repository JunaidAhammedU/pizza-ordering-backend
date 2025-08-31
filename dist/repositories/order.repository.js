"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const base_repository_1 = require("./base.repository");
class OrderRepository extends base_repository_1.BaseRepository {
    constructor(prisma) {
        super(prisma, 'order');
    }
    async findWithItems(id) {
        try {
            return await this.prisma.order.findUnique({
                where: { id, isDeleted: false },
                include: {
                    orderItems: {
                        include: {
                            base: true,
                            size: true,
                            toppings: {
                                include: {
                                    topping: true,
                                },
                            },
                        },
                    },
                },
            });
        }
        catch (error) {
            throw new Error(`Error finding order with items: ${error}`);
        }
    }
    async findWithItemsOrThrow(id) {
        const order = await this.findWithItems(id);
        if (!order) {
            throw new Error(`Order with ID ${id} not found`);
        }
        return order;
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map