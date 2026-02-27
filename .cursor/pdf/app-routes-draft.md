# Kamado app – routes (draft)

_For your use only. Export to PDF if needed: right‑click → “Markdown: Export (PDF)” or print from browser._

---

## Route map

```
/                      →  Home (empty, simple layout)
/request-certificate    →  Request Certificate (form)
/requests              →  Requests List (table)
```

**View / Update:** full‑screen dialog over the list (no extra route).

---

## Layout sketch

```
┌─────────────────────────────────────────────────────────┐
│  [Logo / App name]     Home   Request   Requests List   │  ← simple shell
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ← outlet: empty on Home, form on /request-certificate, │
│             table on /requests                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Home (`/`)

- **Layout:** Same shell as rest of app (header/nav only).
- **Content:** Empty or minimal placeholder (e.g. short welcome line). No features.
- **Use:** Entry point; nav to “Request Certificate” or “Requests List”.

---

## Summary

| Route                  | Page                | Content                                      |
| ---------------------- | ------------------- | -------------------------------------------- |
| `/`                    | Home                | Empty, simple                                |
| `/request-certificate` | Request Certificate | Form + submit                                |
| `/requests`            | Requests List       | Table + sort/filter; row action opens dialog |
