# Kamado

React + TypeScript + Vite application with ESLint, Prettier, and Redux.

## Scripts

| Command       | Description                    |
| ------------- | ------------------------------ |
| `npm run dev` | Start dev server (port 3000)   |
| `npm run build` | Production build             |
| `npm run preview` | Preview production build   |
| `npm run lint` | Run ESLint                    |
| `npm run lint:fix` | Run ESLint with auto-fix  |
| `npm run format` | Format code with Prettier   |

## Environment

Copy `.env.example` to `.env` and set your keys:

- **VITE_API_SUBSCRIPTION_KEY** – API subscription key for backend services.

```bash
cp .env.example .env
# Edit .env and set VITE_API_SUBSCRIPTION_KEY=your-key
```

`.env` is gitignored; do not commit secrets.

## Stack

- [Vite 7](https://vite.dev/) – build tool
- [React 19](https://react.dev/) – UI
- [TypeScript 5.9](https://www.typescriptlang.org/) – types
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React-Redux](https://react-redux.js.org/) – state
- ESLint (flat config) + Prettier – linting and formatting
