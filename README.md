# HR Dashboard

A modern, responsive HR Dashboard built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing employee data, analytics, and bookmarks.

## Features

### Core Features

- 📊 Employee Management
  - View employee list
  - Employee cards with detailed information
  - Search and filter functionality
- 📈 Analytics Dashboard
  - Data visualization
  - Key metrics and statistics
- 🔖 Bookmarks System
  - Save and manage important items
  - Quick access to bookmarked content

### UI/UX Features

- 🌓 Dark/Light Mode
  - System preference detection
  - Manual theme toggle
  - Persistent theme selection
- 🎨 Modern Design
  - Clean and intuitive interface
  - Responsive layout
  - Smooth transitions
- ⚡ Performance
  - Fast page loads
  - Optimized components
  - Error boundaries for stability

### Technical Features

- TypeScript for type safety
- Tailwind CSS for styling
- Next.js 13+ with App Router
- Error handling and loading states
- Responsive design
- SEO optimized

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.8.0 or later)
- npm (v7.0.0 or later)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd hr-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── analytics/      # Analytics pages
│   ├── bookmarks/      # Bookmarks pages
│   ├── employee/       # Employee management pages
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── ...            # Feature-specific components
├── hooks/             # Custom React hooks
├── store/             # State management
└── styles/            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped shape this project










This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

