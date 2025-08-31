import { Request, Response } from 'express';
import { PizzaService } from '../services/pizza.service';
export declare class PizzaController {
    private pizzaService;
    constructor(pizzaService: PizzaService);
    getAvailableBases(_req: Request, res: Response): Promise<void>;
    getAvailableSizes(_req: Request, res: Response): Promise<void>;
    getAvailableToppings(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=pizza.controller.d.ts.map