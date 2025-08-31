# Pizza Ordering Backend API

A robust, scalable backend API for a pizza ordering system built with Node.js, TypeScript, Express, and PostgreSQL.

## 🏗️ Architecture Overview

This backend follows a **layered architecture pattern** with clear separation of concerns:

```
┌─────────────────┐
│   Controllers   │  ← Handle HTTP requests/responses
├─────────────────┤
│    Services     │  ← Business logic layer
├─────────────────┤
│  Repositories   │  ← Data access layer
├─────────────────┤
│   Database      │  ← PostgreSQL with Prisma ORM
└─────────────────┘
```

### Architecture Components:

- **Controllers**: Handle HTTP requests, validate input, and return responses
- **Services**: Contain business logic and orchestrate operations
- **Repositories**: Abstract database operations using Prisma ORM
- **Middleware**: Handle cross-cutting concerns (validation, error handling, logging)
- **Routes**: Define API endpoints and connect them to controllers

## 🛠️ Technology Stack

### Core Technologies:
- **Node.js** (v18+) - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **Prisma** - Type-safe database ORM

### Security & Performance:
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API request throttling
- **Compression** - Response compression
- **Morgan** - HTTP request logging

### Development Tools:
- **Jest** - Testing framework
- **Prettier** - Code formatting
- **ts-node-dev** - Development server with hot reload
- **Winston** - Structured logging

## 📊 Database Schema

The application uses a relational database with the following entities:

### Core Entities:
- **PizzaBase** - Pizza base types (e.g., Classic, Thin Crust)
- **PizzaSize** - Available sizes (e.g., Small, Medium, Large)
- **Topping** - Available toppings (e.g., Pepperoni, Mushrooms)
- **Order** - Customer orders with status tracking
- **OrderItem** - Individual pizza items in an order
- **OrderItemTopping** - Toppings associated with order items

### Order Status Flow:
```
PENDING → CONFIRMED → PREPARING → READY → DELIVERED
    ↓
CANCELLED
```

## 🚀 API Endpoints

### Base URL: `http://localhost:3000/api`

### Pizza Management

#### Get Available Pizza Bases
```http
GET /api/pizza/bases
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123...",
      "name": "Classic",
      "description": "Traditional pizza base",
      "price": "12.99",
      "isAvailable": true
    }
  ]
}
```

#### Get Available Pizza Sizes
```http
GET /api/pizza/sizes
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx456...",
      "name": "Medium",
      "inches": 12,
      "price": "2.99",
      "isAvailable": true
    }
  ]
}
```

#### Get Available Toppings
```http
GET /api/pizza/toppings
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx789...",
      "name": "Pepperoni",
      "description": "Spicy pepperoni slices",
      "price": "1.99",
      "isAvailable": true
    }
  ]
}
```

### Order Management

#### Create New Order
```http
POST /api/orders
```

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "notes": "Extra cheese please",
  "items": [
    {
      "baseId": "clx123...",
      "sizeId": "clx456...",
      "quantity": 2,
      "notes": "Well done",
      "toppings": [
        {
          "toppingId": "clx789...",
          "quantity": 1
        }
      ]
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxorder123...",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1234567890",
    "status": "PENDING",
    "totalAmount": "29.97",
    "notes": "Extra cheese please",
    "createdAt": "2024-01-15T10:30:00Z",
    "items": [...]
  }
}
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd pizza-ordering-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
cp env.example .env
```

Edit `.env` file with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pizza_ordering_db"

# Server
PORT=3000
NODE_ENV=development

# Logging
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 5. Start the Application

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run format` | Format code with Prettier |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema changes to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed database with sample data |

## 🔒 Security Features

- **Helmet**: Security headers protection
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **Error Handling**: Centralized error management

## 📊 Logging

The application uses Winston for structured logging:

- **Log Levels**: error, warn, info, debug
- **Log Files**: `logs/error.log`, `logs/combined.log`
- **Request Logging**: HTTP requests with Morgan
- **Structured Logs**: JSON format for better parsing

## 🏗️ Project Structure

```
src/
├── app.ts                 # Main application setup
├── index.ts              # Application entry point
├── config/               # Configuration files
│   ├── database.ts       # Database connection
│   └── logger.ts         # Winston logger setup
├── controllers/          # HTTP request handlers
│   ├── order.controller.ts
│   └── pizza.controller.ts
├── middleware/           # Express middleware
│   ├── error.middleware.ts
│   └── validation.middleware.ts
├── repositories/         # Data access layer
│   ├── base.repository.ts
│   ├── order.repository.ts
│   └── pizza.repository.ts
├── routes/               # API route definitions
│   ├── order.routes.ts
│   └── pizza.routes.ts
├── services/             # Business logic layer
│   ├── order.service.ts
│   └── pizza.service.ts
├── types/                # TypeScript type definitions
│   └── index.ts
├── utils/                # Utility functions
│   ├── errors.ts
│   └── response.ts
└── validations/          # Zod validation schemas
    └── index.ts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Junaid Ahammed**

---

For more information or support, please open an issue in the repository.