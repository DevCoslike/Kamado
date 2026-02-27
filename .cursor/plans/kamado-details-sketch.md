# Kamado – Details sketch: Request, Request list & components

**Source:** [app-routes-draft.md](../pdf/app-routes-draft.md), [kamado-app-structure.md](kamado-app-structure.md), [kamado-tech-stack.md](kamado-tech-stack.md), [kamado-case-study-visual-plan.md](kamado-case-study-visual-plan.md).

This document describes how each screen and component will look and behave (wireframe-style).

---

## 1. App shell (layout)

Same shell for all routes: header + nav + outlet. **Use PrimeIcons only for branding and nav — no text labels in the header.**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [pi-id-card]                          [pi-home] [pi-file-plus] [pi-list]   │  ← icon logo + icon nav
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ← Outlet: Home | Request Certificate form | Requests list table           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Logo / branding:** Single **PrimeIcon** for the app (e.g. `pi-id-card` for certificate/identity). No “Kamado” or “Logo” text in the header; optional `sr-only` or `aria-label` for screen readers. Icon size ~1.75rem; use `var(--primary-color)` for theme.
- **Nav:** Icon-only links with **PrimeIcons** and `title`/`aria-label` for accessibility:
  - **Home** → `pi-home`
  - **Request Certificate** → `pi-file-plus`
  - **Requests List** → `pi-list`
- **Header:** Logo icon on the left; nav icons on the right (or in a drawer on small screens).
- **Mobile:** Optional `Sidebar` or `Menu` as drawer; same icon links; tap to open/close.
- **Components:** `AppLayout` (or `Shell`); PrimeFlex for layout (`flex`, `justify-content-between`, `p-3`). Nav items are `<a>` or `NavLink` with `<i className="pi pi-*" />` and `title`/`aria-label`.

---

## 2. Home (`/`)

- **Content:** Empty or minimal — e.g. one line: “Welcome. Request a certificate or view your requests.”
- **No table, no form.** Just the shell and short text; users go to “Request Certificate” or “Requests List” via nav.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [pi-id-card]                          [pi-home] [pi-file-plus] [pi-list]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Welcome. Request a certificate or view your requests.                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Component:** `HomePage` — single paragraph or card; PrimeFlex for centering if desired.

---

## 3. Request Certificate (`/request-certificate`)

Single page with one form. No steps; all fields on one screen.

### 3.1 Wireframe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [pi-id-card]                          [pi-home] [pi-file-plus] [pi-list]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Request Certificate                                                        │
│   ─────────────────────────────────────────────────────────────────────    │
│                                                                             │
│   Address to *                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ [alphanumeric text]                                                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│   (error message if invalid)                                                │
│                                                                             │
│   Purpose *  (min 50 characters)                                            │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ [text with styling / rich text; min 50 chars]                        │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│   (error message if invalid)                                                │
│                                                                             │
│   Issued on *  (future dates only)                                           │
│   ┌──────────────────────┐  📅                                             │   │
│   │ DD/MM/YYYY           │                                                 │   │
│   └──────────────────────┘                                                 │
│   (error message if past or empty)                                         │
│                                                                             │
│   Employee ID *                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ [numeric only]                                                        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│   (error message if invalid)                                                │
│                                                                             │
│   [ Submit ]                                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Component breakdown

| Element | Component / tech | Notes |
|--------|-------------------|--------|
| Page | `RequestCertificatePage` | Wraps form; may set title/heading. |
| Form | `RequestCertificateForm` | React Hook Form + Zod. |
| Address to | PrimeReact `InputText` or `InputTextarea` | Optional `FloatLabel`. Alphanumeric validation. |
| Purpose | `InputTextarea` | Min 50 chars; “text with styling” per case study — can be plain text first, rich text later. |
| Issued on | PrimeReact `Calendar` | `minDate` = tomorrow (or today start); no past dates. |
| Employee ID | `InputText` | Numeric only (Zod/regex). |
| Submit | PrimeReact `Button` | type submit; optional loading state during POST. |
| Errors | In-line under each field | From React Hook Form `formState.errors`; red text/small label. |
| Success | Toast (bottom-right) | After POST returns “Ok”: e.g. “Request submitted successfully.” |

### 3.3 Behaviour

- **Validation:** In-line on blur/submit; no submit until valid.
- **Submit:** POST to `.../request-certificate?subscription-key=<KEY>` with `address_to`, `purpose`, `issued_on`, `employee_id`.
- **On success:** Show Toast; optionally clear form or redirect to `/requests` (per product choice).

---

## 4. Requests list (`/requests`)

Table plus filters above it. One action per row: open view dialog.

### 4.1 Wireframe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [pi-id-card]                          [pi-home] [pi-file-plus] [pi-list]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Requests List                                                              │
│   ─────────────────────────────────────────────────────────────────────    │
│                                                                             │
│   Filters:                                                                   │
│   Reference No. [________]   Address to [________]   Status [Dropdown ▼]    │
│   (full match)                 (contains)             (New/Done/…)         │
│                                                                             │
│   ┌────────────┬──────────────┬─────────────┬────────────┬────────┬───────┐ │
│   │ Ref No. ↕  │ Address to   │ Purpose     │ Issued on ↕│ Status ↕│       │ │
│   ├────────────┼──────────────┼─────────────┼────────────┼────────┼───────┤ │
│   │ REF-001    │ Acme Corp    │ To confirm… │ 15/03/2025 │ New    │  [👁]  │ │
│   │ REF-002    │ Beta Ltd     │ Employment… │ 10/03/2025 │ Done   │  [👁]  │ │
│   │ …          │ …            │ …           │ …          │ …      │  [👁]  │ │
│   └────────────┴──────────────┴─────────────┴────────────┴────────┴───────┘ │
│                                                                             │
│   (Optional: sort indicators on Issued on, Status; ↕ = click to toggle)     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Columns (from case study)

| Column | Content | Sort | Filter |
|--------|---------|------|--------|
| Reference No. | Text from API | No | Yes — full match (InputText) |
| Address to | Text | No | Yes — contains (InputText) |
| Purpose | Text (can truncate with “…”) | No | Optional |
| Issued on | Date (formatted) | Yes | Optional |
| Status | New / Done (or API values) | Yes | Yes — full match (Dropdown) |
| *(last)* | Action | — | Icon button → open dialog |

### 4.3 Component breakdown

| Element | Component / tech | Notes |
|--------|-------------------|--------|
| Page | `RequestsListPage` | Fetches list (GET request-list) on mount; dispatches to Redux; renders filters + table + dialog. |
| Table | PrimeReact `DataTable` | Columns as above; sortable on Issued on & Status; row action = icon button. |
| Filter – Reference No. | `InputText` | Full match; filter applied to `items` (client-side or DataTable filter). |
| Filter – Address to | `InputText` | Contains; same idea. |
| Filter – Status | `Dropdown` | Options: e.g. “All”, “New”, “Done”. |
| Row action | `Button` (icon) | e.g. `pi pi-eye`; onClick → set selected request id → open dialog. |
| Loading / error | Spinner + Toast or inline message | While GET in progress; error message if fetch fails. |

### 4.4 Behaviour

- **Load:** On mount, GET `.../request-list?subscription-key=<KEY>` → dispatch `setRequests(data)` → table reads from Redux.
- **Sort:** By Issued on and Status (asc/desc) via DataTable sort or custom comparator.
- **Filter:** Reference No. full match, Address to contains, Status full match; applied to `items` in memory (or DataTable filter API).
- **Row action:** Click icon → `setSelectedId(id)` (or set selected request) → open full-screen View Request dialog.

---

## 5. View request (full-screen dialog)

Opened from the list row; no separate route. Shows one request and, on the right, PDF or “Certificate is yet to be issued.”

### 5.1 Wireframes

**Desktop (md and up):** Side-by-side layout.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  View request                                                    [ ✕ ]      │
├─────────────────────────────────────────────────────────────────────────────┤
│  LEFT (details)                 │  RIGHT (document)                         │
│  Reference No. / Address / …     │  PDF or "Certificate is yet to be issued."│
└─────────────────────────────────────────────────────────────────────────────┘
```

**Mobile (default, &lt; 768px):** Single column, details first, then document. Sticky header with touch-friendly close (min 44×44px).

```
┌─────────────────────────────┐
│ View request          [ ✕ ]  │  ← sticky header
├─────────────────────────────┤
│ Details (scrollable)         │
│ Reference No.    REF-001     │
│ Address to       Acme Corp   │
│ Purpose          To confirm… │
│ (if New: textarea + Confirm) │
│ Issued on (if Done) 15/03/25 │
│ Status   New                 │
├─────────────────────────────┤
│ Document                     │
│ ┌─────────────────────────┐ │
│ │ PDF or "Certificate is   │ │  ← full width; min-height for tap/scroll
│ │ yet to be issued."       │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### 5.2 Component breakdown

| Element | Component / tech | Notes |
|--------|-------------------|--------|
| Container | PrimeReact `Dialog` | Full-screen: `style={{ width: '100vw', height: '100vh' }}` or similar; modal; close on ✕ or overlay. |
| Left panel | Div + PrimeFlex | Labels + read-only values; layout with `flex`, `flex-column`, `gap`. |
| Reference No. | Text | From selected request. |
| Address to | Text | From selected request. |
| Purpose | Text or `InputTextarea` | Read-only when status ≠ “New”; when status = “New”: editable textarea + “Confirm” button (F06). |
| Issued on | Text (formatted date) | Rendered only when status = “Done” (F05-R01). |
| Status | Text or badge | “New” / “Done”. |
| Right panel | Div | PDF viewer or placeholder message. |
| PDF | `<object>` or `<iframe>` | `data` or `src` = blob URL or static sample PDF when status = “Done”; no API. |
| Placeholder | Paragraph text | “Certificate is yet to be issued.” when status ≠ “Done”. |
| Confirm (F06) | `Button` | Only visible when status = “New”; on click → dispatch `updateRequestPurpose(id, newPurpose)` → close or keep dialog; list updates from Redux. |

### 5.4 Behaviour

- **Open:** From list row icon → set `selectedId` in Redux (or local state) → dialog visible; content = request with that id from store.
- **Close:** ✕ or click outside → clear `selectedId` (and/or dialog open state).
- **PDF:** If status = “Done”, show PDF (mock URL / base64 / static file); else show “Certificate is yet to be issued.”
- **Update purpose (F06):** When status = “New”, user edits Purpose and clicks Confirm → update in Redux only → list and dialog both re-render with new purpose; no API call.

---

## 6. Notifications (Toast)

- **Placement:** Bottom-right (e.g. PrimeReact Toast `position="bottom-right"` at app root).
- **Use:** Success after form submit; error on API failure; info when list loads or when purpose is updated in dialog.
- **Component:** Single PrimeReact `Toast` in `App.tsx` (or layout); trigger via ref or context, e.g. `toast.current?.show({ severity: 'success', summary: 'Done', detail: 'Request submitted.' })`.

---

## 7. Component summary map

| Area | Main component(s) | Children / related |
|------|-------------------|---------------------|
| Shell | `AppLayout` | Logo icon (`pi-id-card`), nav icon links (`pi-home`, `pi-file-plus`, `pi-list`), `<Outlet />` |
| Home | `HomePage` | — |
| Request certificate | `RequestCertificatePage` | `RequestCertificateForm` (inputs, Calendar, Button) |
| Requests list | `RequestsListPage` | Filters (InputText, Dropdown), DataTable, `ViewRequestDialog` |
| View request | `ViewRequestDialog` | Left: labels + values + editable Purpose (New); Right: PDF or placeholder; Close, Confirm |
| Notifications | Toast (app root) | — |

---

## 8. Data and state (recap)

- **List:** Redux `requests.items`; loaded by GET request-list; filters/sort applied in component or selector.
- **Selected request:** Redux `requests.selectedId` (or selected request object); dialog reads selected from store.
- **Update purpose:** Redux action `updateRequestPurpose(id, purpose)`; no API; list and dialog both read from store.

---

## 9. Mobile / responsive notes

- **Shell:** Nav can collapse to a menu/drawer (e.g. PrimeReact `Sidebar` or `Menu`) on small screens.
- **Request form:** Stack fields vertically; full-width inputs; Calendar remains usable (touch).
- **Requests list:** DataTable can use horizontal scroll on small screens; filters stack vertically if needed.
- **View dialog:** Full-screen already; left/right panels can stack vertically on narrow viewports (details above, document below).

This sketch aligns with the routes draft (no route for view/update), the app structure (pages, features, Redux), the tech stack (PrimeReact, PrimeFlex, RHF + Zod), and the case study requirements (F02–F06).

### PrimeIcons used in shell (from PrimeIcons / `primeicons`)

| Role | Icon class | Purpose |
|------|------------|--------|
| Logo / Kamado | `pi-id-card` | App branding (certificate/identity); no text in header. |
| Home | `pi-home` | Navigate to `/`. |
| Request Certificate | `pi-file-plus` | Navigate to `/request-certificate`. |
| Requests List | `pi-list` | Navigate to `/requests`. |

Use `title` and `aria-label` on nav links so icon-only nav stays accessible. Import `primeicons/primeicons.css` in the app entry.
