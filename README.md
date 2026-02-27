# Kamado

React + TypeScript + Vite application with ESLint, Prettier, and Redux.

## Scripts


| Command            | Description                  |
| ------------------ | ---------------------------- |
| `npm run dev`      | Start dev server (port 3000) |
| `npm run build`    | Production build             |
| `npm run preview`  | Preview production build     |
| `npm run lint`     | Run ESLint                   |
| `npm run lint:fix` | Run ESLint with auto-fix     |
| `npm run format`   | Format code with Prettier    |


## Environment (API calls)

API requests use config from `.env`. Copy `.env.example` to `.env` and set:


| Variable                      | Description                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **VITE_API_BASE_URL**         | Zalex API base URL (no trailing slash). Example: `https://test.testing-api.net`                               |
| **VITE_API_SUBSCRIPTION_KEY** | API subscription key (from separate email). Required for POST `/request-certificate` and GET `/request-list`. |


```bash
cp .env.example .env
# Edit .env (no quotes needed), e.g.:
# VITE_API_BASE_URL=https://test.testing-api.net
# VITE_API_SUBSCRIPTION_KEY=your-key
```

`.env` is gitignored; do not commit it or real keys.

## Stack

- [Vite 7](https://vite.dev/) – build tool
- [React 19](https://react.dev/) – UI
- [TypeScript 5.9](https://www.typescriptlang.org/) – types
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React-Redux](https://react-redux.js.org/) – state
- ESLint (flat config) + Prettier – linting and formatting

