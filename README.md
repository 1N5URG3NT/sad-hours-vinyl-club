# Sad Hours Vinyl Club — Real Ecommerce Site

**Premium custom vinyl decals with real payments.**

This site is now **ready for production deployment**.

It includes:
- Real Stripe Checkout (cards + Apple Pay + Google Pay)
- Professional pre-checkout order review
- Branded order confirmation emails
- Solid error handling and payment cancellation recovery
- Mobile-friendly checkout flows

---

## Quick Deployment Status

**Current State:** Production-ready.

### Required Customizations Before Going Live

Before deploying, you should update these for your business:

- Business email address in environment variables (`BUSINESS_EMAIL`)
- Email sender address in `stripe-webhook.js` (after verifying domain in Resend)
- Any contact details or copy in the success page and emails
- Shipping rates (currently hardcoded in the functions)

### Final Pre-Deployment Checklist (Do These)

- [ ] Push latest code to GitHub
- [ ] Deploy to Netlify (or update existing site)
- [ ] Add the 4 required environment variables in Netlify
- [ ] Configure Stripe webhook with the correct signing secret
- [ ] Test one full purchase in **Stripe Test Mode**
- [ ] Confirm both customer and business emails arrive
- [ ] Test payment cancellation flow
- [ ] Switch to Stripe Live Mode when ready for real customers

Detailed instructions are below.

**Tech stack:**
- Custom dark tactical frontend
- Real Stripe Checkout (cards, Apple Pay, Google Pay)
- Netlify Functions (serverless backend)
- Professional order confirmation emails via Resend

---

## Quick Start (Local Testing)

```bash
npm install
npm run dev
```

Open http://localhost:8888

**Note:** Real payments will not work locally. Use this mainly for design and flow testing.

---

## Full Deployment Guide (Recommended Path: GitHub + Netlify)

### Step 1: Create Required Accounts

| Service   | Purpose                    | Free Tier Quality | Required? |
|-----------|----------------------------|-------------------|---------|
| **Stripe**    | Real payments              | Excellent         | Yes     |
| **Netlify**   | Hosting + Functions        | Very good         | Yes     |
| **Resend**    | Transactional emails       | Good              | Yes     |
| **GitHub**    | Version control            | Excellent         | Strongly recommended |

### Step 2: Prepare Your Code

1. Push the entire `sad-hours-vinyl-club` folder to a GitHub repository.

### Step 3: Deploy on Netlify

1. Go to [Netlify](https://app.netlify.com) → **Add new site** → **Import from Git**
2. Connect your repository
3. Netlify should auto-detect the project. Use these settings if prompted:
   - **Build command:** `npm install`
   - **Publish directory:** `.`
   - **Functions directory:** `netlify/functions`

### Step 4: Add Environment Variables (Critical)

Go to **Site settings → Environment variables** and add these exactly:

| Variable                    | Where to get it                              | Example format          | Notes |
|----------------------------|----------------------------------------------|-------------------------|-------|
| `STRIPE_SECRET_KEY`        | Stripe → Developers → API keys               | `sk_test_...` or live   | Never expose this |
| `STRIPE_WEBHOOK_SECRET`    | Stripe → Developers → Webhooks               | `whsec_...`             | Required for emails |
| `RESEND_API_KEY`           | Resend dashboard                             | `re_...`                | For sending emails |
| `BUSINESS_EMAIL`           | Your email address                           | `you@yourdomain.com`    | Where you receive order alerts |

**After adding variables → Trigger a new deploy.**

### Step 5: Configure Stripe Webhook (Most Important Step)

1. In Stripe Dashboard → **Developers → Webhooks** → **Add endpoint**
2. Endpoint URL:
   ```
   https://your-site-name.netlify.app/.netlify/functions/stripe-webhook
   ```
3. Select only this event: `checkout.session.completed`
4. Save and copy the **Signing secret**
5. Add it as `STRIPE_WEBHOOK_SECRET` in Netlify (if you haven't already)
6. Redeploy

---

## Post-Deployment Checklist

- [ ] Test a full purchase in **Stripe Test Mode**
- [ ] Confirm customer receives email
- [ ] Confirm you receive the business notification email
- [ ] Test cancelling a payment on Stripe (should show a helpful message)
- [ ] Verify the success page looks correct
- [ ] Check that the "Edit Cart" button works in the pre-checkout modal
- [ ] Switch to Stripe **Live Mode** when ready for real sales
- [ ] Update the "from" email address in the webhook once you verify a domain in Resend

---

## How the Checkout Flow Works (Current State)

1. Customer adds products to cart
2. Clicks **PROCEED TO CHECKOUT**
3. Sees a clean, professional order review modal with:
   - Full itemized summary (with sizes, finishes, colors)
   - Pricing breakdown (subtotal, shipping, total)
   - Name + Email fields
4. Clicks **Continue to Secure Payment**
5. Redirected to Stripe’s hosted checkout page (very secure)
6. After successful payment → lands on a strong `/success.html` page
7. Both the customer and you automatically receive high-quality branded emails

---

## Important Notes

- **Shipping**: Simple flat $12 (free over $120). Can be improved later.
- **Order Management**: Currently handled in your Stripe Dashboard.
- **Emails**: Update the `from` address in `stripe-webhook.js` after verifying a domain in Resend.
- **Production vs Test**: Always test thoroughly in Stripe Test Mode before going live.

---

## Troubleshooting

**Emails not sending?**
- Check that `RESEND_API_KEY` and `BUSINESS_EMAIL` are set correctly.
- Check Netlify Function logs for errors.

**Webhook not firing?**
- Make sure the webhook secret in Netlify matches the one from Stripe.
- Confirm the endpoint URL is correct and only the `checkout.session.completed` event is selected.

**Payment cancelled but no message shown?**
- Make sure the latest version of the site is deployed.

---

## After You Go Live

Once you're taking real orders:

- Monitor your first 5–10 orders closely in both Stripe and your email.
- Update the `from` email in `netlify/functions/stripe-webhook.js` after verifying a domain in Resend (this reduces spam risk dramatically).
- Consider adding your real logo and contact details to the email templates.
- Keep an eye on your Stripe balance and payouts.

## Future Upgrades (Recommended Order)

When you're ready to level up further:

1. Better shipping calculator / real-time rates
2. Custom admin dashboard (Supabase or similar)
3. Inventory management
4. Abandoned cart recovery emails
5. Customer accounts + order history

---

## Need Help?

If you run into issues during setup:

Please share:
- The exact step you're stuck on
- Any error messages (check Netlify Function logs)
- Whether you're using Test mode or Live mode in Stripe

We'll get it working.

---

**You're now ready to deploy.**

Follow the checklist at the top of this document. Once the environment variables and webhook are correctly configured, this site is capable of taking real payments for your business.

This setup is intentionally the **lowest-headache real ecommerce** path while keeping your site 100% custom.

If you get stuck on any step (especially environment variables or Stripe webhooks), send me the exact error and I’ll walk you through it.

You now have a real business website that can take money.

No cheap shit. No fading. No apologies.