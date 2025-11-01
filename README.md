# BuyFromChina.ca

BuyFromChina.ca is a production-ready Next.js application that helps Canadians request quotes for Taobao/Tmall products, review an all-inclusive CAD breakdown, and pay securely once the quote is approved. An authenticated admin area powers quote management, pricing overrides with audit trails, and order tracking.

## Tech Stack

- **Frontend**: Next.js 14 (App Router, Server/Client components), TypeScript, Tailwind CSS
- **Forms & Validation**: React Hook Form, Zod
- **Backend**: Server Actions, Prisma ORM, PostgreSQL (SQLite for local dev if desired)
- **Payments**: Stripe Checkout with webhook fulfillment
- **Auth**: NextAuth (credentials)
- **Email**: Resend (preferred) with Nodemailer SMTP fallback
- **Storage**: Supabase Storage (quote reference images)
- **Misc**: Stripe webhooks, in-memory rate limiting with swappable adapter

## Getting Started

1. **Copy environment template**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in environment variables**

   - `DATABASE_URL`: PostgreSQL connection string (local or production).
   - `NEXTAUTH_SECRET`: random string for NextAuth.
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`: admin portal credentials (password can be plaintext or bcrypt hash).
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: Stripe test credentials.
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_QUOTE_BUCKET`: Supabase project URL, service role key, and bucket that stores quote attachments.
   - `EMAIL_FROM` plus either `RESEND_API_KEY` or SMTP credentials (optional; logs to console if omitted).

> **Production secrets:** keep public/test values in `.env.local` for local dev. Use `.env.production` (provided) or your hosting provider's secret manager for live keys such as `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `SUPABASE_SERVICE_ROLE_KEY`.

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Generate Prisma client and run migrations**
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev
   ```

5. **(Optional) Seed demo data**
   ```bash
   pnpm seed
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Stripe Webhook (local)

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Forward events to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. Copy the signing secret into `.env.local` (`STRIPE_WEBHOOK_SECRET`).

### Supabase Storage (quote images)

1. Create a bucket (e.g. `quote-attachments`) and make it **public** so admin/users can view the images.
2. Add the required DNS records and verify the `buyfromchina.ca` domain (done once).
3. Copy the project URL, service role key, and bucket name into `.env.local` / deployment secrets.
4. Server actions use the service role key to upload images; the URLs are stored on each quote.

## Project Structure

- `src/app` – App Router pages, API routes, server actions.
- `src/components` – Reusable UI components.
- `src/lib` – Shared utilities (Prisma, NextAuth, Stripe, Supabase admin client, pricing, rate limiting).
- `src/emails` – HTML/text email templates.
- `prisma` – Prisma schema, migrations, seed script.
- `public` – Static assets (`og.jpg`, favicons, etc.).

## Core Flows

- **Quote request** (`/quote`): Validated with Zod + React Hook Form, rate limited, uploads optional reference images to Supabase, persists to Prisma, emails customer and admin, shows CAD breakdown.
- **Checkout** (`/checkout/[quoteId]`): Creates Stripe Checkout Session and redirects.
- **Webhook** (`/api/webhooks/stripe`): Confirms payment, flips Order + Quote statuses to `PAID`, emails receipt, notifies admin.
- **Admin portal** (`/admin`): Credentials auth via NextAuth with:
  - Quote list/detail with status filters, CSV export, pricing overrides, and audit trail.
  - Order list/detail with status controls synced to quotes.

## Scripts

- `pnpm dev` – Start Next.js dev server.
- `pnpm build` – Build for production.
- `pnpm start` – Run the production build.
- `pnpm lint` – Run ESLint.
- `pnpm typecheck` – TypeScript project check.
- `pnpm prisma:migrate` – Run migrations (`prisma migrate dev`).
- `pnpm prisma:generate` – Generate Prisma client.
- `pnpm prisma:studio` – Launch Prisma Studio.
- `pnpm seed` – Execute `prisma/seed.ts`.

## Testing & Verification

- Lint: `pnpm lint`
- Type safety: `pnpm typecheck`
- Manual smoke test:
  1. Submit a quote on `/quote` and verify email logs/notifications.
  2. Click “Proceed to Checkout” → Stripe Checkout should open (test mode).
  3. Complete payment with Stripe test card.
  4. Confirm `/success` page shows receipt and admin order status updates to `PAID`.

## Notes

- Rate limiting uses an in-memory store by default; swap in a Redis-backed adapter by implementing the `RateLimiter` interface in `src/lib/rate-limit.ts`.
- Emails fall back to console logs when neither Resend nor SMTP credentials are configured (handy for local development).
- Quote reference images are stored in Supabase Storage and displayed in the admin quote detail view.
- Admin passwords accept either plaintext or bcrypt hashes, making it easy to use generated secrets in production.
