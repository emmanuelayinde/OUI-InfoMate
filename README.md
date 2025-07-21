# OUI Assistant Frontend

A modern, responsive React application built with TypeScript that provides an AI-powered chatbot interface for Oduduwa University Ipetumodu (OUI) students. Get instant information about university services, procedures, and campus life through an intuitive chat interface.

![OUI Assistant](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.1-yellow.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.11-green.svg)

## 🎯 Features

### Core Functionality

- **AI-Powered Chat Interface** - Interactive chatbot for university information
- **User Authentication** - Secure login/signup with JWT token management
- **Real-time Messaging** - Instant responses with smooth chat experience
- **Chat History Management** - Persistent conversation history
- **Responsive Design** - Optimized for desktop and mobile devices

### User Experience

- **Dark/Light Theme Toggle** - Customizable appearance
- **Pre-defined Questions** - Quick-start suggestions for common queries
- **Auto-scroll Messages** - Automatically scrolls to latest messages
- **Mobile-First Design** - Collapsible sidebar for mobile users
- **Markdown Support** - Rich text formatting in chat responses

### Technical Features

- **Type-Safe Development** - Full TypeScript implementation
- **Modern State Management** - Zustand for efficient state handling
- **API Integration** - React Query for optimized data fetching
- **Component Library** - Shadcn/ui for consistent design system
- **Form Validation** - React Hook Form with Zod schemas

## 🛠️ Tech Stack

### Core Framework

- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe JavaScript development
- **Vite 5.4.1** - Fast build tool and development server

### Styling & UI

- **TailwindCSS 3.4.11** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful SVG icons
- **next-themes** - Theme management

### State Management & Data

- **Zustand** - Lightweight state management
- **TanStack React Query** - Data fetching and caching
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Routing & Navigation

- **React Router DOM** - Client-side routing
- **React Navigation** - Programmatic navigation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **bun** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/emmanuelayinde/OUI-InfoMate.git
   cd OUI-InfoMate/frontend
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Using bun (recommended)
   bun install
   ```

3. **Environment Setup**

   ```bash
   # Copy environment template
   cp .env.example .env

   # Configure your environment variables
   VITE_BASE_API_URL=http://localhost:8000
   ```

4. **Start development server**

   ```bash
   # Using npm
   npm run dev

   # Using bun
   bun dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/                    # Source code
│   ├── api/               # API layer
│   │   ├── auth.ts        # Authentication endpoints
│   │   ├── chat.ts        # Chat endpoints
│   │   ├── axios.ts       # HTTP client setup
│   │   └── index.ts       # API exports
│   ├── components/        # Reusable components
│   │   ├── ui/            # Shadcn/ui components
│   │   ├── ChatSidebar.tsx
│   │   ├── Loader.tsx
│   │   └── theme-toggle.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── auth/          # Authentication hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/               # Utility libraries
│   │   └── utils.ts       # Helper functions
│   ├── pages/             # Application pages
│   │   ├── Chat.tsx       # Main chat interface
│   │   ├── Dashboard.tsx  # User dashboard
│   │   ├── Landing.tsx    # Homepage
│   │   ├── Login.tsx      # Login page
│   │   ├── NotFound.tsx   # 404 page
│   │   └── Signup.tsx     # Registration page
│   ├── store/             # State management
│   │   ├── use-auth.ts    # Authentication state
│   │   └── use-chat.ts    # Chat state
│   ├── types/             # TypeScript definitions
│   │   ├── auth.ts        # Auth types
│   │   ├── chat.ts        # Chat types
│   │   └── index.ts       # Type exports
│   ├── utils/             # Utility functions
│   │   ├── cookie.ts      # Cookie management
│   │   ├── markdown.ts    # Markdown processing
│   │   └── index.ts       # Utility exports
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── .env.example           # Environment template
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API Configuration
VITE_BASE_API_URL=http://localhost:8000

# Optional: Additional configuration
VITE_APP_NAME=OUI Assistant
VITE_APP_VERSION=1.0.0
```

## 📱 Key Components

### Authentication System

- **Login/Signup Pages** - User registration and authentication
- **Protected Routes** - Route guards for authenticated users
- **Token Management** - JWT token storage and refresh
- **User Profile** - Profile management and display

### Chat Interface

- **Chat Sidebar** - Chat history and navigation
- **Message Display** - Rich message rendering with markdown
- **Input Handler** - Message composition and sending
- **Pre-defined Questions** - Quick-start conversation starters

### State Management

- **Auth Store** - User authentication state
- **Chat Store** - Chat history and active conversation
- **UI State** - Theme, sidebar, and global UI state

## 🎨 Theming

The application supports both light and dark themes:

- **Theme Toggle** - Switch between light/dark modes
- **System Preference** - Respects user's system theme
- **Persistent Storage** - Theme preference saved locally
- **CSS Variables** - Customizable color scheme

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

## 🔧 Configuration

### TailwindCSS

The project uses a custom TailwindCSS configuration with:

- **Custom Colors** - OUI brand colors
- **Typography Plugin** - Enhanced text styling
- **Animation Classes** - Smooth transitions and animations

### TypeScript

Strict TypeScript configuration with:

- **Path Mapping** - `@/` alias for src directory
- **Strict Mode** - Enhanced type checking
- **Module Resolution** - Node.js style imports

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 Code Style

This project follows these coding standards:

- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

## 🐛 Troubleshooting

### Common Issues

**Build Errors**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Type Errors**

```bash
# Run type checking
npm run type-check
```

**Environment Issues**

- Ensure `.env` file exists and contains required variables
- Check API endpoint connectivity
- Verify backend server is running

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Emmanuel Ayinde** - [@emmanuelayinde](https://github.com/emmanuelayinde)

## 🙏 Acknowledgments

- **Oduduwa University Ipetumodu** - For project inspiration
- **Shadcn/ui** - For the excellent component library
- **TailwindCSS** - For the utility-first CSS framework
- **React Team** - For the amazing framework

---

For more information about the backend API, see the [Backend Documentation](../backend/README.md).

**Happy Coding! 🚀**
