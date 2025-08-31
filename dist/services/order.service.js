"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
class OrderService {
    orderRepository;
    pizzaService;
    constructor(orderRepository, pizzaService) {
        this.orderRepository = orderRepository;
        this.pizzaService = pizzaService;
    }
    async createOrder(orderData) {
        let totalAmount = 0;
        const orderItemsData = [];
        for (const item of orderData.items) {
            const toppingIds = item.toppings.map(t => t.toppingId);
            const { base, size, toppings } = await this.pizzaService.validatePizzaComponents(item.baseId, item.sizeId, toppingIds);
            const basePrice = Number(base.price);
            const sizePrice = Number(size.price);
            const toppingsPrice = toppings.reduce((sum, topping) => {
                const itemTopping = item.toppings.find(t => t.toppingId === topping.id);
                return sum + (Number(topping.price) * (itemTopping?.quantity || 0));
            }, 0);
            const itemUnitPrice = basePrice + sizePrice + toppingsPrice;
            const itemTotalPrice = itemUnitPrice * item.quantity;
            totalAmount += itemTotalPrice;
            orderItemsData.push({
                baseId: item.baseId,
                sizeId: item.sizeId,
                quantity: item.quantity,
                unitPrice: itemUnitPrice,
                totalPrice: itemTotalPrice,
                notes: item.notes,
                toppings: {
                    create: item.toppings.map(topping => ({
                        toppingId: topping.toppingId,
                        quantity: topping.quantity,
                        unitPrice: Number(toppings.find(t => t.id === topping.toppingId)?.price || 0),
                        totalPrice: Number(toppings.find(t => t.id === topping.toppingId)?.price || 0) * topping.quantity,
                    })),
                },
            });
        }
        const order = await this.orderRepository.create({
            customerName: orderData.customerName,
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone,
            totalAmount,
            notes: orderData.notes,
            orderItems: {
                create: orderItemsData,
            },
        });
        return await this.getOrderById(order.id);
    }
    async getOrderById(id) {
        const order = await this.orderRepository.findWithItemsOrThrow(id);
        return this.mapOrderToResponseDto(order);
    }
    mapOrderToResponseDto(order) {
        return {
            id: order.id,
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            customerPhone: order.customerPhone,
            status: order.status,
            totalAmount: Number(order.totalAmount),
            notes: order.notes,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            orderItems: order.orderItems.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                unitPrice: Number(item.unitPrice),
                totalPrice: Number(item.totalPrice),
                notes: item.notes,
                base: {
                    id: item.base.id,
                    name: item.base.name,
                    description: item.base.description,
                    price: Number(item.base.price),
                    isAvailable: item.base.isAvailable,
                },
                size: {
                    id: item.size.id,
                    name: item.size.name,
                    inches: item.size.inches,
                    price: Number(item.size.price),
                    isAvailable: item.size.isAvailable,
                },
                toppings: item.toppings.map((topping) => ({
                    id: topping.id,
                    quantity: topping.quantity,
                    unitPrice: Number(topping.unitPrice),
                    totalPrice: Number(topping.totalPrice),
                    topping: {
                        id: topping.topping.id,
                        name: topping.topping.name,
                        description: topping.topping.description,
                        price: Number(topping.topping.price),
                        isAvailable: topping.topping.isAvailable,
                    },
                })),
            })),
        };
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map