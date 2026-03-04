## Ecoyaan Checkout Flow

A simplified, responsive checkout experience inspired by Ecoyaan.  
Built to demonstrate **Next.js SSR**, **App Router**, **React state management with Context**, and **modern UI/UX** for a 3‑step checkout.

---

## Features & Assignment Checklist

- **Cart / Order Summary Screen**
  - Renders products with **image, name, price, quantity**.
  - Shows **subtotal**, **shipping fee**, and **grand total**.
  - Includes a clear **“Proceed to Checkout”** CTA.
- **Shipping Address Screen**
  - Collects: **Full Name, Email, Phone Number, PIN Code, City, State**.
  - Basic validation:
    - Required: full name, city, state.
    - Email: simple `name@domain.tld` format check.
    - Phone: **10‑digit** numeric.
    - PIN code: **6‑digit** numeric.
- **Payment / Confirmation Screen**
  - Displays **final order summary** (items + totals).
  - Shows the **entered shipping address**.
  - Offers a simulated payment section with multiple payment methods.
  - **“Pay Securely”** button routes to a success state.
- **Order Success Screen**
  - Simple confirmation UI with a generated **order ID** and status messaging.
  - CTA to go back to the cart / continue shopping.
- **State Management**
  - Uses **React Context (Context API)** to share cart + address state across steps.
- **SSR + Mock Backend**
  - Uses **Next.js App Router server components** and `fetch` during server render.
  - Cart data is loaded from a **local mock API route**.

All core requirements from the assignment brief are implemented.

---

## Tech Stack

- **Next.js 14** (App Router, using React Server Components)
- **React** for UI
- **Tailwind CSS (v4)** for utility‑first styling
- **Context API** for shared cart & address state
- **Next.js API Route** for mock backend data (`/api/cart`)

---

## Architecture & Code Structure

High‑level layout:

- `app/layout.jsx`
  - Root layout shared across all routes.
  - Wraps the app with `CheckoutProvider` (Context).
  - Contains **sticky header** and **footer**.
- `context/CheckoutContext.jsx`
  - Defines `CheckoutContext` + `CheckoutProvider`.
  - Holds:
    - `cartItems`
    - `shippingFee`
    - `discount`
    - `address`
    - Derived values: `subtotal`, `grandTotal`.
  - Exposed via `useCheckout()` hook used in client components.

### Pages / Routes

- `app/page.jsx`
  - **Server Component** (no `"use client"`).
  - Performs SSR data fetching via `fetch`:
    - Calls `GET /api/cart` using `baseUrl` from `NEXT_PUBLIC_BASE_URL` or `http://localhost:3000`.
    - Marked with `{ cache: "no-store" }` to always use fresh mock data.
  - Passes the loaded JSON as `initialData` to the client component `CartClient`.

- `app/CartClient.jsx`
  - `"use client"` component for the **Cart / Order Summary** screen.
  - On mount:
    - Seeds the `CheckoutContext` with:
      - `cartItems` (from `initialData.cartItems`)
      - `shippingFee`
      - `discount`
  - Computes subtotal / totals (with a small fallback to `initialData` so it renders immediately).
  - Renders:
    - `ProgressBar` with `current={0}`.
    - `OrderSummary` for item breakdown + totals.
    - “**Proceed to Checkout**” button → navigates to `/shipping`.

- `app/shipping/page.jsx`
  - `"use client"` form for the **Shipping Address** screen.
  - Uses local `useState` for the form and an `errors` object.
  - Validation rules:
    - `fullName`, `city`, `state`: required non‑empty strings.
    - `email`: simple regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
    - `phone`: `^\d{10}$`.
    - `pinCode`: `^\d{6}$`.
  - On submit:
    - If validation fails → `errors` populated and inline messages shown.
    - If valid → calls `setAddress(form)` from `useCheckout` and routes to `/payment`.
  - Includes:
    - `ProgressBar` with `current={1}`.
    - Buttons: **Back** (router.back) and **Continue to Payment**.

- `app/payment/page.jsx`
  - `"use client"` component for **Review & Pay**.
  - Reads `cartItems`, `address`, totals from `useCheckout`.
  - Guard:
    - If `address` is `null`, it shows a message and a button to go back to `/shipping` (prevents skipping the step).
  - Renders:
    - `ProgressBar` with `current={2}`.
    - `OrderSummary` (final order recap).
    - “Delivering To” card showing the user’s address with an **Edit** button (routes back to `/shipping`).
    - Simple **payment method selection** UI (radio list; visually simulates multiple options).
    - “**Pay Securely · ₹{grandTotal}**” button, which routes to `/success`.

- `app/success/page.jsx`
  - `"use client"` component rendering the **Order Successful** state.
  - Generates a pseudo‑random order ID (`ECO-xxxxx`) once per render.
  - Explains order confirmation and estimated delivery.
  - “**Continue Shopping**” button routes back to `/`.

- `app/api/cart/route.js`
  - Next.js App Router **route handler** acting as a mock backend.
  - Returns JSON with:
    - `cartItems`: array of objects `{ product_id, product_name, product_price, quantity, image }`.
    - `shipping_fee`.
    - `discount_applied`.
  - Fulfills the assignment’s “mock data / mock backend” requirement.

### Shared Components

- `components/OrderSummary.jsx`
  - Displays the list of cart items + price breakdown.
  - Accepts `cartItems`, `subtotal`, `shippingFee`, `discount`, `grandTotal`.
  - Uses `ProductCard` for each item row.

- `components/ProductCard.jsx`
  - Shows product image, name, quantity, and line total.

- `components/ProgressBar.jsx`
  - Visual multi‑step indicator for **Cart → Shipping → Payment**.
  - `current` prop controls which step is active/completed.

---

## Styling & Responsiveness

- **Tailwind CSS v4**:
  - Global styles imported via `styles/global.css`.
  - Utility classes handle spacing, layout, typography, borders, and colors.
- Layout is designed to be:
  - **Mobile‑first** with constrained widths (`max-w-lg`, centered content).
  - Adjusted typography and spacing that reads well on desktop as well.
- The header is **sticky** on scroll, and card‑like sections use subtle borders and rounded corners for a clean, modern look.

---

## Running the Project Locally

Requirements:

- Node.js (LTS recommended)
- npm

Install dependencies and start the dev server:

```bash
npm install
npm run dev
# App will be available at http://localhost:3000
```

No additional environment variables are required for local development.  
By default, SSR uses `http://localhost:3000` as the base URL to call the mock cart API.

If you want to be explicit (or when deploying), you can set:

```bash
NEXT_PUBLIC_BASE_URL="https://your-deployment-domain.com"
```

---

## Deployment Notes

This project is designed to be deployed easily to platforms like **Vercel**:

1. Push the repository to GitHub/GitLab.
2. Create a new project in Vercel and import the repo.
3. Use the default **Next.js** build settings (`npm run build` / `next start`).
4. Optionally set `NEXT_PUBLIC_BASE_URL` to your deployed URL so SSR fetches the cart from the same origin.

Once deployed, share:

- **Repository link** (GitHub / GitLab).
- **Live deployment URL** (e.g., Vercel).

---

## Notes on Code Quality & Trade‑offs

- The project intentionally focuses on a **clean, understandable MVP** rather than deep production hardening.
- Client state is kept simple via React Context instead of heavier solutions (Redux/Zustand), which keeps the assignment small but illustrates cross‑page state.
- Form validation is basic but covers the main edge cases requested in the brief; it can be extended with a schema library (e.g., Zod/React Hook Form) if needed.
- Some generic, unused UI components and configuration were removed to keep the codebase lean and focused on the checkout flow itself.
