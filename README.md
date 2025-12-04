# PEN2-Stack

A full-stack web application for the **RetailZoom Web Development Team**.

## 🏗️ Project Structure

```
PEN2-stack/
├── backend/          # Express.js API server
├── frontend/         # Next.js web application
├── docker/           # Docker configuration
├── scripts/          # Build and deployment scripts
└── README.md
```

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Language:** TypeScript
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Testing:** Jest, Supertest, Testcontainers

### Frontend
- **Framework:** Next.js 15
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** Radix UI, shadcn/ui
- **Forms:** TanStack React Form + Zod
- **Data Tables:** TanStack Table
- **Theming:** next-themes

## 📚 Documentation

For detailed documentation on code patterns and architecture, visit the **[Documentation Page](/documents)** in the running application.

## 📦 Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PEN2-stack
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

#### Backend (Development)
```bash
cd backend
npm run dev
```
The API server will start with hot-reload enabled.

#### Frontend (Development)
```bash
cd frontend
npm run dev
```
The Next.js app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run test:ci    # Run tests in CI mode
```

## 📝 Scripts

### Backend Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm test` | Run tests |
| `npm run check` | Build, lint, and test |

### Frontend Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔒 Security

The backend implements several security measures:
- **Helmet.js** - Sets various HTTP headers for security
- **CORS** - Configured for secure cross-origin requests
- **Cookie Parser** - Secure cookie handling
- **JWT Authentication** - Token-based authentication

## 📄 License

ISC

---

Built with ❤️ by the **RetailZoom Web Development Team**
