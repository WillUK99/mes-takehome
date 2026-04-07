# MyEdSpace

A prototype demonstrating a parent purchase → student onboarding → LMS flow for an educational platform.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Next.js App Router                          │
├─────────────────┬─────────────────┬─────────────────────────────────┤
│   /products     │  /onboarding/   │           /lms                  │
│   (Purchase)    │    [token]      │     (Dashboard + Lessons)       │
│                 │  (Student setup)│                                 │
├─────────────────┴─────────────────┴─────────────────────────────────┤
│                         Server Actions                              │
│   purchaseAction          completeOnboardingAction                  │
├─────────────────────────────────────────────────────────────────────┤
│                      Middleware (route guard)                       │
│             Protects /lms/* — requires session cookie               │
├─────────────────────────────────────────────────────────────────────┤
│                        lib/server/                                  │
│   memory-store.ts (purchases, invitations, students)                │
│   types.ts (domain types)                                           │
├─────────────────────────────────────────────────────────────────────┤
│                        lib/store/                                   │
│   useSessionStore.ts (mock user session store)                      │
│   useLmsProgressStore.ts (lesson completion tracking)               │
└─────────────────────────────────────────────────────────────────────┘
```

### User Flow

1. **Parent** visits `/products`, selects a course, enters email → creates a `Purchase` and `Invitation` (token logged to console)
2. **Student** receives invitation URL `/onboarding/{token}`, creates name + password → activates student record, sets session cookie, redirects to LMS
3. **LMS** at `/lms` shows dashboard with lessons and progress tracking; individual lesson pages at `/lms/lesson/[id]`

### Data Model

- **Purchase** — parent email + course selection
- **Invitation** — secure token linking purchase to student slot (single-use)
- **Student** — activated student profile with course access

All data lives in an in-memory `Map` via `globalThis` for prototype simplicity (resets on server restart).

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js 16 App Router + Server Actions** | Modern patterns; co-located actions with routes; native form handling without API boilerplate |
| **In-memory store (no database)** | Prototype scope; demonstrates the flow without infrastructure setup |
| **Zod + react-hook-form** | Type-safe validation shared between client and server; progressive enhancement |
| **Zustand with persistence** | Lightweight client state; `localStorage` persistence for session hydration and lesson progress |
| **Token-based invitations** | Secure one-time links (base64url tokens); prevents unauthorized onboarding |
| **Middleware for route protection** | Declarative; runs at edge before page render; single source of auth truth |
| **Multi-stage Docker build** | Standalone output (~150MB image vs ~1GB); non-root user; layer caching for deps |
| **Tailwind CSS v4** | Design tokens via CSS variables; dark mode support; consistent component styling |

## Running Locally

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev
# → http://localhost:3000
```

### Docker

```bash
docker compose up --build
# → http://localhost:3000
```

## AI Tools During Development

This prototype was built using **Cursor**. The AI was used for:

### Planning

- Created detailed implementation plans for features before coding
- Plans included sequence diagrams, file-by-file changes, and verification steps

### Code Generation

- Initial scaffolding of components, forms, and server actions
- Zustand store setup with persistence middleware
- Docker configuration (Dockerfile, docker-compose.yml)

### Refactoring

- Brand styling rollout across all pages
- Component collocation (moving components to route-specific `_lib` folders)

### Example Plan (Redirect Fix)

```markdown
## Root cause

- middleware.ts requires SESSION_COOKIE_NAME for any /lms request
- completeOnboardingAction sets httpOnly cookie, returns a success
- Client router.push("/lms") runs without new cookie on that request
- Fix: use redirect() from Server Action so browser follows 303 with Set-Cookie
```

## Project Structure

```
app/
├── page.tsx                    # Home (session-aware)
├── products/                   # Course selection + purchase
│   └── _lib/
│       ├── actions/
│       └── components/
├── onboarding/[token]/         # Student activation
│   └── _lib/
│       ├── actions/
│       └── components/
└── lms/                        # Learning management
    ├── _lib/components/
    └── lesson/[id]/
        └── _lib/components/
lib/
├── constants/                  # Course data, session key
├── server/                     # Memory store, types
├── services/                   # Business logic (checkout, lessons)
├── store/                      # Zustand stores
└── validation/                 # Zod schemas
```

:D