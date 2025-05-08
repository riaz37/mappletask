# MappleTask

MappleTask is a full-stack product management application built with a modern tech stack. It features a Next.js frontend, NestJS backend, and uses Prisma with PostgreSQL for data storage.

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
- Yarn 1.22 or later
- PostgreSQL database

### Environment Setup

1. Create a `.env` file in the `apps/server` directory:

```
DATABASE_URL="postgresql://username:password@localhost:5432/mappletask?schema=public"
JWT_SECRET="your-secret-key"
PORT=3001
```

2. Create a `.env` file in the `apps/web` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Installation

```bash
# Install dependencies
yarn install

# Generate Prisma client
cd apps/server
yarn prisma generate

# Run database migrations
yarn prisma migrate dev

# Return to root directory
cd ../..
```

### Development

```bash
# Start all applications in development mode
yarn dev

# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# API Documentation: http://localhost:3001/api
```

### Build

```bash
# Build all applications
yarn build

# Start production server
yarn start
```

## Cloud Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Configure the project:
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && yarn turbo run build --filter=web...`
   - Output Directory: `.next`
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL

### Render (Backend)

1. Create a Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Root Directory: `apps/server`
   - Build Command: `cd ../.. && yarn install && yarn turbo run build --filter=server...`
   - Start Command: `cd apps/server && node dist/main`
4. Set environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Your secret key for JWT
   - `PORT`: `10000` (Render default)

## Features

- **User Authentication** - Register, login, and JWT-based authentication
- **Product Management** - Create, read, update, and delete products
- **Responsive Design** - Works on desktop and mobile devices
- **API Documentation** - Swagger UI for API exploration

## API Documentation

The API documentation is available at `http://localhost:3001/api` when the server is running.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```
