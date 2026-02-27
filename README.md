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

 *do not commit real keys.

## Stack

- [Vite 7](https://vite.dev/) – build tool
- [React 19](https://react.dev/) – UI
- [TypeScript 5.9](https://www.typescriptlang.org/) – types
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React-Redux](https://react-redux.js.org/) – state
- ESLint (flat config) + Prettier – linting and formatting

## Case study checklist

- F01-R01 – React app, runs on localhost:3000
- F02-R01 – Request form (Address to, Purpose, Issued on, Employee ID)
- F02-R02 – In-line validation + error messages
- F02-R03 – POST request-certificate with API key
- F02-R04 – Success confirmation message
- F04-R01 – Requests list table (all columns)
- F04-R02 – Sort by Issued on, Status
- F04-R03 – Filter by Reference No., Address to, Status
- F04-R04 – GET request-list on load
- F05-R01 – Dialog from row icon, all fields (Issued on if Done)
- F05-R02 – PDF viewer or "Certificate is yet to be issued"
- F06-R01 – Editable purpose when status New + confirm button
- F06-R02 – List updates without refresh
- (Optional) T-01 – Deploy online

