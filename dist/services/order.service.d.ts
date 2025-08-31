import { OrderRepository } from '../repositories/order.repository';
import { PizzaService } from './pizza.service';
import { CreateOrderDto, OrderResponseDto } from '../types';
export declare class OrderService {
    private orderRepository;
    private pizzaService;
    constructor(orderRepository: OrderRepository, pizzaService: PizzaService);
    createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto>;
    getOrderById(id: string): Promise<OrderResponseDto>;
    private mapOrderToResponseDto;
}
//# sourceMappingURL=order.service.d.ts.map