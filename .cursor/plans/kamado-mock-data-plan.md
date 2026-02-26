---
name: Kamado mock-only data plan
overview: Build the Kamado app without the real API layer, using mock data only. Same UI and Redux flow; data comes from a mock layer instead of fetch to zalexinc.azure-api.net.
todos: []
isProject: false
---

# Kamado app – mock data only (no API layer)

You can build the full app **without calling the real API**, using only mock data. All features (F01–F06) work the same; only the source of data changes.

---

## 1. Approach

| Layer        | With real API              | Mock-only (this plan)                    |
|-------------|----------------------------|------------------------------------------|
| **Data source** | `fetch` to zalexinc.azure-api.net | In-memory mock data + functions that return it |
| **POST request-certificate** | POST → backend → success | Add new request to mock list, return `{ responce: "Ok" }` |
| **GET request-list**        | GET → backend → array     | Return mock array (and later include any “submitted” requests) |
| **Redux / UI**              | Unchanged                 | Unchanged                                |

Keep the **same interface** as the planned API (e.g. `postRequestCertificate(payload)`, `getRequestList()`) so that switching to the real API later is a single swap of the implementation.

---

## 2. Folder structure (adjusted)

| Path | Purpose |
|------|---------|
| **`src/api/`** | **Optional.** Either omit and use only mocks, or keep as a thin wrapper that calls the mock layer (so components/thunks still call `api.postRequestCertificate` / `api.getRequestList`). |
| **`src/mocks/`** or **`src/data/`** | Mock data and mock “API” functions: seed list of requests, `getRequestList()`, `postRequestCertificate()` that appends to the list and returns success. |

Recommended: **`src/mocks/`** with:

- **`mockRequests.ts`** – Seed array of request objects (Reference No., Address to, Purpose, Issued on, Status, etc.).
- **`mockApi.ts`** – `getRequestList()` returns the (mutable) list; `postRequestCertificate(body)` generates a reference number, pushes a new request with status `"New"`, returns `{ responce: "Ok" }`.

Then either:

- **Option A – Components/thunks call mocks directly:** e.g. `import { getRequestList, postRequestCertificate } from '@/mocks/mockApi'`.
- **Option B – Keep `src/api/` as facade:** `api.getRequestList()` and `api.postRequestificate()` live in `src/api/` and internally call the mock functions. Later you replace the body of those functions with real `fetch` and keep the same `api` interface.

Option B is better for a future switch to the real API.

---

## 3. Mock data shape

Match the API response shapes from the case study so Redux and UI need no changes:

**Single request (list item / dialog):**

- `reference_no` (string) – e.g. generated as `REF-${Date.now()}` or from a counter.
- `address_to` (string)
- `purpose` (string)
- `issued_on` (string) – e.g. `"12/9/2022"`
- `employee_id` (string)
- `status` – `"New"` | `"Done"` (and optionally other statuses if you want).

**POST response:** `{ responce: "Ok" }` (keep the typo to match the case study).

**GET list response:** Array of the request objects above.

Include a few seed requests with mixed statuses (e.g. one “Done”, two “New”) so you can test the list, sort, filter, view dialog, PDF vs “Certificate is yet to be issued”, and update purpose (New only).

---

## 4. Request certificate (F02) with mocks

- Form submit → call **mock** `postRequestCertificate({ address_to, purpose, issued_on, employee_id })`.
- Mock implementation:
  - Generate `reference_no`.
  - Push `{ reference_no, address_to, purpose, issued_on, employee_id, status: "New" }` to the in-memory list.
  - Return `{ responce: "Ok" }`.
- App shows success message (F02-R04) as with the real API. No real HTTP.

---

## 5. Requests list (F04) with mocks

- On load → call **mock** `getRequestList()`.
- Mock returns the in-memory array (seed data + any requests “submitted” via the form).
- Dispatch `setRequests(data)` to Redux; table, sort, and filter work exactly as in the app-structure plan. No real HTTP.

---

## 6. View / Update (F05, F06)

- **F05:** Dialog and PDF (or “Certificate is yet to be issued”) unchanged; data still comes from Redux (filled from mock list).
- **F06:** Update purpose in Redux only; no backend call. Same as in the original plan.

---

## 7. PDF for “Done” (F05-R02)

Unchanged: use a mock PDF (e.g. static file in `public/`, or base64, or blob URL) for requests with status “Done”. No API for the document.

---

## 8. Summary

| Question | Answer |
|----------|--------|
| Can we create the app without the API layer? | **Yes.** Use a mock data layer only. |
| Do we need `src/api/`? | Optional. Prefer keeping it as a facade that calls mocks, so switching to real API later is a single change. |
| What to add? | `src/mocks/` (or `src/data/`) with seed data and `getRequestList` / `postRequestCertificate` mock implementations. |
| Redux / routes / components? | Same as in [kamado-app-structure.md](kamado-app-structure.md); only the data source is mock instead of fetch. |

This keeps the app runnable and fully featured on localhost:3000 with no API key and no backend.
