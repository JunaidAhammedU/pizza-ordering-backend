import { PizzaService } from '../../services/pizza.service';
import { PizzaBaseRepository, PizzaSizeRepository, ToppingRepository } from '../../repositories/pizza.repository';
import { ConflictError } from '../../utils/errors';

// Mock repositories
const mockPizzaBaseRepository = {
    findAvailable: jest.fn(),
    findByIdOrThrow: jest.fn(),
    findByName: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const mockPizzaSizeRepository = {
    findAvailable: jest.fn(),
    findByIdOrThrow: jest.fn(),
    findByName: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const mockToppingRepository = {
    findAvailable: jest.fn(),
    findByIdOrThrow: jest.fn(),
    findByName: jest.fn(),
    findByIds: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('PizzaService', () => {
    let pizzaService: PizzaService;

    beforeEach(() => {
        pizzaService = new PizzaService(
            mockPizzaBaseRepository as any,
            mockPizzaSizeRepository as any,
            mockToppingRepository as any,
        );
        jest.clearAllMocks();
    });

    describe('getAvailableBases', () => {
        it('should return available pizza bases', async () => {
            const mockBases = [
                { id: '1', name: 'Thin Crust', price: 10, isAvailable: true },
                { id: '2', name: 'Thick Crust', price: 12, isAvailable: true },
            ];

            mockPizzaBaseRepository.findAvailable.mockResolvedValue(mockBases);

            const result = await pizzaService.getAvailableBases();

            expect(result).toEqual(mockBases);
            expect(mockPizzaBaseRepository.findAvailable).toHaveBeenCalledTimes(1);
        });
    });

    describe('getAvailableSizes', () => {
        it('should return available pizza sizes', async () => {
            const mockSizes = [
                { id: '1', name: 'Small', inches: 10, price: 8, isAvailable: true },
                { id: '2', name: 'Medium', inches: 12, price: 10, isAvailable: true },
            ];

            mockPizzaSizeRepository.findAvailable.mockResolvedValue(mockSizes);

            const result = await pizzaService.getAvailableSizes();

            expect(result).toEqual(mockSizes);
            expect(mockPizzaSizeRepository.findAvailable).toHaveBeenCalledTimes(1);
        });
    });

    describe('getAvailableToppings', () => {
        it('should return available toppings', async () => {
            const mockToppings = [
                { id: '1', name: 'Pepperoni', price: 2, isAvailable: true },
                { id: '2', name: 'Mushrooms', price: 1.5, isAvailable: true },
            ];

            mockToppingRepository.findAvailable.mockResolvedValue(mockToppings);

            const result = await pizzaService.getAvailableToppings();

            expect(result).toEqual(mockToppings);
            expect(mockToppingRepository.findAvailable).toHaveBeenCalledTimes(1);
        });
    });

    describe('createBase', () => {
        it('should create a new pizza base successfully', async () => {
            const baseData = {
                name: 'New Crust',
                description: 'A new type of crust',
                price: 15,
                isAvailable: true,
            };

            mockPizzaBaseRepository.findByName.mockResolvedValue(null);
            mockPizzaBaseRepository.create.mockResolvedValue({ id: '1', ...baseData });

            const result = await pizzaService.createBase(baseData);

            expect(result).toEqual({ id: '1', ...baseData });
            expect(mockPizzaBaseRepository.findByName).toHaveBeenCalledWith(baseData.name);
            expect(mockPizzaBaseRepository.create).toHaveBeenCalledWith(baseData);
        });

        it('should throw ConflictError if base with same name exists', async () => {
            const baseData = {
                name: 'Existing Crust',
                price: 15,
            };

            mockPizzaBaseRepository.findByName.mockResolvedValue({ id: '1', ...baseData });

            await expect(pizzaService.createBase(baseData)).rejects.toThrow(ConflictError);
            expect(mockPizzaBaseRepository.create).not.toHaveBeenCalled();
        });
    });

    describe('validatePizzaComponents', () => {
        it('should validate pizza components successfully', async () => {
            const baseId = 'base1';
            const sizeId = 'size1';
            const toppingIds = ['topping1', 'topping2'];

            const mockBase = { id: baseId, name: 'Thin Crust', price: 10, isAvailable: true };
            const mockSize = { id: sizeId, name: 'Medium', inches: 12, price: 8, isAvailable: true };
            const mockToppings = [
                { id: 'topping1', name: 'Pepperoni', price: 2, isAvailable: true },
                { id: 'topping2', name: 'Mushrooms', price: 1.5, isAvailable: true },
            ];

            mockPizzaBaseRepository.findByIdOrThrow.mockResolvedValue(mockBase);
            mockPizzaSizeRepository.findByIdOrThrow.mockResolvedValue(mockSize);
            mockToppingRepository.findByIds.mockResolvedValue(mockToppings);

            const result = await pizzaService.validatePizzaComponents(baseId, sizeId, toppingIds);

            expect(result).toEqual({
                base: mockBase,
                size: mockSize,
                toppings: mockToppings,
            });
        });

        it('should throw error if base is not available', async () => {
            const baseId = 'base1';
            const sizeId = 'size1';
            const toppingIds: string[] = [];

            const mockBase = { id: baseId, name: 'Thin Crust', price: 10, isAvailable: false };

            mockPizzaBaseRepository.findByIdOrThrow.mockResolvedValue(mockBase);

            await expect(pizzaService.validatePizzaComponents(baseId, sizeId, toppingIds))
                .rejects.toThrow('Selected pizza base is not available');
        });

        it('should throw error if size is not available', async () => {
            const baseId = 'base1';
            const sizeId = 'size1';
            const toppingIds: string[] = [];

            const mockBase = { id: baseId, name: 'Thin Crust', price: 10, isAvailable: true };
            const mockSize = { id: sizeId, name: 'Medium', inches: 12, price: 8, isAvailable: false };

            mockPizzaBaseRepository.findByIdOrThrow.mockResolvedValue(mockBase);
            mockPizzaSizeRepository.findByIdOrThrow.mockResolvedValue(mockSize);

            await expect(pizzaService.validatePizzaComponents(baseId, sizeId, toppingIds))
                .rejects.toThrow('Selected pizza size is not available');
        });
    });
});
