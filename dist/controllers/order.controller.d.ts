import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=order.controller.d.ts.map