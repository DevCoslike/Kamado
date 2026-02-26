---
name: React app ESLint Prettier setup
overview: Configure modern linting/formatting on the existing Kamado app with ESLint security rules, Prettier, and import sorting on save, plus practical defaults for the case-study build.
todos:
  - id: set-port
    content: Set Vite dev server port to 3000 in vite.config.ts
    status: completed
  - id: setup-eslint
    content: Install missing ESLint plugins and rewrite eslint.config.js with React, a11y, security, simple-import-sort, and Prettier compat
    status: completed
  - id: setup-prettier-save
    content: Install Prettier, add .prettierrc/.prettierignore, and add .vscode/settings.json for format+lint on save
    status: in_progress
  - id: setup-env-and-docs
    content: Add .env.example, update .gitignore, install Redux packages, and update README
    status: pending
  - id: verify-tooling
    content: Run npm run lint and npm run build to validate the full toolchain
    status: pending
isProject: false
---

# Kamado Tooling Plan v2 (updated)

## Current state

Project already scaffolded (Vite 7 + React 19 + TypeScript 5.9). `node_modules` installed.

Already present:

- `eslint` 9.x, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Basic flat config in [Kamado/eslint.config.js](Kamado/eslint.config.js)

Still needed:

- `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `eslint-plugin-security`, `eslint-plugin-simple-import-sort`, `eslint-config-prettier`
- `prettier`
- `@reduxjs/toolkit`, `react-redux`
- Port 3000, `.prettierrc`, `.prettierignore`, `.vscode/settings.json`, `.env.example`, updated README

---

## Implementation Steps

### 1) Set Vite dev port to 3000

- Edit [Kamado/vite.config.ts](Kamado/vite.config.ts): add `server: { port: 3000 }`.

### 2) Extend ESLint config

- Install missing dev deps:
  `npm i -D eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-security eslint-plugin-simple-import-sort eslint-config-prettier`
- Rewrite [Kamado/eslint.config.js](Kamado/eslint.config.js) to include:
  - Existing: `@eslint/js` recommended, `typescript-eslint` recommended, `react-hooks` recommended, `react-refresh`
  - New: `eslint-plugin-react` (jsx-runtime mode), `jsx-a11y` recommended, `security` recommended, `simple-import-sort` (imports + exports as error), `eslint-config-prettier` last (disables formatting rules)
- Add `format` and `lint:fix` scripts to `package.json`.

### 3) Configure Prettier + save behavior

- Install: `npm i -D prettier`
- Create [Kamado/.prettierrc](Kamado/.prettierrc):
  - `singleQuote: true`, `trailingComma: "all"`, `semi: true`, `printWidth: 80`, `tabWidth: 2`
- Create [Kamado/.prettierignore](Kamado/.prettierignore): `dist`, `node_modules`, `coverage`
- Create [Kamado/.vscode/settings.json](Kamado/.vscode/settings.json):
  - `editor.formatOnSave: true`
  - `editor.defaultFormatter: "esbenp.prettier-vscode"`
  - `editor.codeActionsOnSave: { "source.fixAll.eslint": "explicit" }`

### 4) Environment, Redux, and README

- Create [Kamado/.env.example](Kamado/.env.example) with `VITE_API_SUBSCRIPTION_KEY=`
- Confirm `.env` is in [Kamado/.gitignore](Kamado/.gitignore)
- Install runtime deps: `npm i @reduxjs/toolkit react-redux`
- Update [Kamado/README.md](Kamado/README.md) with dev/lint/build/format commands and API key instructions

### 5) Verify toolchain

- `npm run lint` passes cleanly
- `npm run build` completes successfully
- `npm run dev` confirms port 3000

## Dependency delta (what to install)

- Dev: `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `eslint-plugin-security`, `eslint-plugin-simple-import-sort`, `eslint-config-prettier`, `prettier`
- Runtime: `@reduxjs/toolkit`, `react-redux`

## Notes

- ESLint is the single owner of import sorting (no Prettier import-sort plugin)
- `eslint-config-prettier` must be last in the config array to disable conflicting rules
- `eslint-plugin-security` recommended rules will be enabled; tune only confirmed false positives
- `eslint-plugin-react-refresh` (already installed by Vite template) is kept for HMR safety
