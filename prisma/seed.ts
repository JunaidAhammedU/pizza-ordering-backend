import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database adding default data...');

    const bases = await Promise.all([
        prisma.pizzaBase.upsert({
            where: { name: 'Thin Crust' },
            update: {},
            create: {
                name: 'Thin Crust',
                description: 'Crispy thin crust perfect for light pizzas',
                price: 8.00,
                isAvailable: true,
            },
        }),
        prisma.pizzaBase.upsert({
            where: { name: 'Thick Crust' },
            update: {},
            create: {
                name: 'Thick Crust',
                description: 'Soft and fluffy thick crust',
                price: 10.00,
                isAvailable: true,
            },
        }),
        prisma.pizzaBase.upsert({
            where: { name: 'Stuffed Crust' },
            update: {},
            create: {
                name: 'Stuffed Crust',
                description: 'Crust filled with melted cheese',
                price: 12.00,
                isAvailable: true,
            },
        }),
        prisma.pizzaBase.upsert({
            where: { name: 'Gluten-Free' },
            update: {},
            create: {
                name: 'Gluten-Free',
                description: 'Gluten-free crust for dietary restrictions',
                price: 14.00,
                isAvailable: true,
            },
        }),
    ]);

    console.log(' Pizza bases created:', bases.length);

    const sizes = await Promise.all([
        prisma.pizzaSize.upsert({
            where: { name: 'Small' },
            update: {},
            create: {
                name: 'Small',
                inches: 10,
                price: 5.00,
                isAvailable: true,
            },
        }),
        prisma.pizzaSize.upsert({
            where: { name: 'Medium' },
            update: {},
            create: {
                name: 'Medium',
                inches: 12,
                price: 7.00,
                isAvailable: true,
            },
        }),
        prisma.pizzaSize.upsert({
            where: { name: 'Large' },
            update: {},
            create: {
                name: 'Large',
                inches: 14,
                price: 9.00,
                isAvailable: true,
            },
        }),
        prisma.pizzaSize.upsert({
            where: { name: 'Extra Large' },
            update: {},
            create: {
                name: 'Extra Large',
                inches: 16,
                price: 11.00,
                isAvailable: true,
            },
        }),
    ]);

    console.log('Pizza sizes created:', sizes.length);

    const toppings = await Promise.all([
        prisma.topping.upsert({
            where: { name: 'Pepperoni' },
            update: {},
            create: {
                name: 'Pepperoni',
                description: 'Spicy Italian pepperoni slices',
                price: 2.50,
                isAvailable: true,
            },
        }),
        prisma.topping.upsert({
            where: { name: 'Mushrooms' },
            update: {},
            create: {
                name: 'Mushrooms',
                description: 'Fresh sliced mushrooms',
                price: 1.50,
                isAvailable: true,
            },
        }),
        prisma.topping.upsert({
            where: { name: 'Bell Peppers' },
            update: {},
            create: {
                name: 'Bell Peppers',
                description: 'Colorful bell pepper slices',
                price: 1.00,
                isAvailable: true,
            },
        }),
        prisma.topping.upsert({
            where: { name: 'Onions' },
            update: {},
            create: {
                name: 'Onions',
                description: 'Sliced red onions',
                price: 1.00,
                isAvailable: true,
            },
        }),
        prisma.topping.upsert({
            where: { name: 'Sausage' },
            update: {},
            create: {
                name: 'Sausage',
                description: 'Italian sausage crumbles',
                price: 2.00,
                isAvailable: true,
            },
        }),
        prisma.topping.upsert({
            where: { name: 'Bacon' },
            update: {},
            create: {
                name: 'Bacon',
                description: 'Crispy bacon bits',
                price: 2.50,
                isAvailable: true,
            },
        }),
        prisma.topping.upsert({
            where: { name: 'Extra Cheese' },
            update: {},
            create: {
                name: 'Extra Cheese',
                description: 'Additional mozzarella cheese',
                price: 1.50,
                isAvailable: true,
            },
        }),
        prisma.topping.upsert({
            where: { name: 'Olives' },
            update: {},
            create: {
                name: 'Olives',
                description: 'Black olives',
                price: 1.50,
                isAvailable: true,
            },
        }),
        prisma.topping.upsert({
            where: { name: 'Pineapple' },
            update: {},
            create: {
                name: 'Pineapple',
                description: 'Fresh pineapple chunks',
                price: 1.50,
                isAvailable: true,
            },
        }),
        prisma.topping.upsert({
            where: { name: 'Ham' },
            update: {},
            create: {
                name: 'Ham',
                description: 'Sliced ham',
                price: 2.00,
                isAvailable: true,
            },
        }),
    ]);

    console.log('Toppings created:', toppings.length);
    console.log('Database added default data successfully!');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
