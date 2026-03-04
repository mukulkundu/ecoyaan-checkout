# Ecoyaan Checkout Flow

A simplified checkout flow built with Next.js App Router.

## Tech Stack
- **Next.js 14** (App Router) with SSR via Server Components
- **Tailwind CSS** for styling
- **Context API** for state management across steps
- **Next.js API Routes** for mock backend

## Architecture
- `/app/page.jsx` — Server Component that fetches cart data via SSR
- `/app/api/cart/route.js` — Mock API returning cart JSON
- `/context/CheckoutContext.jsx` — Global state for cart + address
- `/components/` — Reusable UI components

## Run Locally
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Flow
Cart → Shipping Address (with validation) → Payment Review → Order Success