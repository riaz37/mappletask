# MappleTask

MappleTask is a full-stack task management application built with a modern tech stack. It features a Next.js frontend, NestJS backend, and uses Prisma with PostgreSQL for data storage.

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - ORM for database access
- **PostgreSQL** - Relational database
- **Swagger** - API documentation

### Infrastructure
- **Turborepo** - Monorepo management
- **TypeScript** - Static type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Project Structure

```
mappletask/
├── apps/
│   ├── server/         # NestJS backend
│   └── web/            # Next.js frontend
├── packages/
│   ├── eslint-config/  # Shared ESLint configuration
│   ├── typescript-config/ # Shared TypeScript configuration
│   └── ui/             # Shared UI components
└── turbo.json          # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 11 or later
- PostgreSQL database

### Environment Setup

1. Create a `.env` file in the `apps/server` directory:

```
DATABASE_URL="postgresql://username:password@localhost:5432/mappletask?schema=public"
JWT_SECRET="your-secret-key"
PORT=3001
```

2. Create a `.env.local` file in the `apps/web` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
cd apps/server
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Return to root directory
cd ../..
```

### Development

```bash
# Start all applications in development mode
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# API Documentation: http://localhost:3001/api
```

### Build

```bash
# Build all applications
npm run build

# Start production server
npm run start
```

## Features

- **User Authentication** - Register, login, and JWT-based authentication
- **Product Management** - Create, read, update, and delete products
- **Responsive Design** - Works on desktop and mobile devices
- **API Documentation** - Swagger UI for API exploration

## API Documentation

The API documentation is available at `http://localhost:3001/api` when the server is running.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
