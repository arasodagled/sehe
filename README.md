# SUHÉ — Vercel + Stripe boutique starter

A responsive Next.js storefront with a three-product sample catalogue, cart and Stripe-hosted checkout. Prices and product descriptions are editable in `app/products.ts`. Product illustrations in `public/` are placeholders, not finished pack photography.

## Run locally

1. Install Node.js 20 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Set `STRIPE_SECRET_KEY` to your **Stripe test** secret key (from Stripe dashboard).
5. Run `npm run dev`, then open http://localhost:3000.
6. Use a Stripe test card in Stripe-hosted checkout; do not use real card details in test mode.

## Deploy to Vercel

1. Push this project to a private GitHub repository.
2. Import the repository into Vercel as a Next.js project.
3. In Vercel project settings, add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL` (your production HTTPS domain, without trailing slash).
4. Redeploy after adding variables.
5. Test a full purchase flow in Stripe test mode before using live keys.

## Before taking real orders

- **Important:** This is a starter storefront, not a production-ready fulfilment system. A success page redirect is **not** proof of payment. Implement and verify Stripe webhook signatures (especially `checkout.session.completed` and relevant asynchronous payment events), persist orders in a database, and fulfil only verified paid orders. Add idempotency so retries cannot create duplicate fulfilments.
- Add stock management, tax/VAT handling, shipping policy, returns/refunds, terms, privacy/cookie notices, contact details, product safety and required candle labelling. Check UK consumer law and applicable age/Stripe account requirements. If under 18, have an eligible adult handle payment-account ownership and business arrangements.
- Add order confirmation emails, accessibility and browser testing, analytics/cookie consent if used, and real photography.
- Currently only UK shipping is allowed and a flat £4.50 delivery fee is applied at checkout; adjust to your real logistics.
- Prices are **sample concepts**, not verified costs or market pricing.
- Never commit `.env.local` or publish secret keys. Keep Stripe secret keys server-side only.
- `SUHÉ` is a working brand name: check trademarks before launch.

## Files

- `app/page.tsx` — responsive storefront and basket
- `app/products.ts` — product catalogue, trusted server-side pricing
- `app/api/checkout/route.ts` — creates a Stripe Checkout Session
- `app/globals.css` — styling
- `public/*.svg` — replaceable product artwork
