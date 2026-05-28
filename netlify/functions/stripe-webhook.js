// netlify/functions/stripe-webhook.js
// Handles Stripe events (especially successful payments) and sends emails via Resend

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    };
  }

  // Handle the event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;

    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerName = session.metadata?.customerName || 'Valued Customer';
    const amountTotal = (session.amount_total / 100).toFixed(2);

    console.log(`[Sad Hours] Payment successful: ${customerEmail} — $${amountTotal} (Session: ${session.id})`);

    // Safety check
    if (!session.payment_intent) {
      console.warn('[Sad Hours] No payment_intent found on session');
    }

    // ===================== CUSTOMER EMAIL (Premium) =====================
    if (customerEmail) {
      try {
        await resend.emails.send({
          from: 'Sad Hours Vinyl Club <orders@sadhoursvinyl.com>', // TODO: Change this after verifying a domain in Resend
          to: customerEmail,
          subject: `Order Confirmed — ${session.id.slice(0, 12)}`,
          html: `
            <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 620px; margin: 0 auto; background: #0a0a0b; color: #e8e8ea; padding: 40px 24px;">
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="display: inline-block; background: #9f1f2b; color: white; font-weight: 700; letter-spacing: 2px; font-size: 13px; padding: 6px 14px; border-radius: 2px;">SAD HOURS VINYL CLUB</div>
              </div>

              <h1 style="font-size: 28px; line-height: 1.1; margin: 0 0 12px; font-weight: 700; color: #fff;">Order Confirmed.</h1>
              <p style="font-size: 17px; color: #c8c8cc; margin: 0 0 32px;">Thank you, ${customerName.split(' ')[0]}. Your decals are now being prepared.</p>

              <div style="background: #121214; border: 1px solid #2a2a2f; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <div style="margin-bottom: 16px;">
                  <div style="font-size: 11px; letter-spacing: 1.5px; color: #9a9aa0; margin-bottom: 4px;">ORDER REFERENCE</div>
                  <div style="font-family: monospace; font-size: 15px; color: #fff;">${session.id}</div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 15px;">
                  <div style="color: #9a9aa0;">Total Paid</div>
                  <div style="font-weight: 600; color: #fff;">$${amountTotal}</div>
                </div>
              </div>

              <div style="margin-bottom: 32px;">
                <div style="font-size: 12px; letter-spacing: 1.5px; color: #9a9aa0; margin-bottom: 12px;">NEXT STEPS</div>
                <div style="line-height: 1.6; color: #c8c8cc;">
                  • Your decals will be cut within <strong>1–3 business days</strong><br>
                  • Tracking will be sent the moment your order ships<br>
                  • Questions? Reply to this email
                </div>
              </div>

              <div style="border-top: 1px solid #2a2a2f; padding-top: 24px; font-size: 13px; color: #666;">
                <strong style="color: #9a9aa0;">Sad Hours Vinyl Club</strong><br>
                No cheap shit. No fading. No apologies.
              </div>
            </div>
          `
        });
      } catch (emailErr) {
        console.error('Failed to send customer email:', emailErr);
      }
    }

    // ===================== BUSINESS NOTIFICATION (Premium) =====================
    const businessEmail = process.env.BUSINESS_EMAIL || 'you@yourdomain.com';
    try {
      await resend.emails.send({
        from: 'Sad Hours Orders <orders@sadhoursvinyl.com>',
        to: businessEmail,
        subject: `NEW ORDER — $${amountTotal} • ${customerName}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 620px; margin: 0 auto; background: #0a0a0b; color: #e8e8ea; padding: 32px 24px;">
            <div style="margin-bottom: 20px;">
              <div style="background: #9f1f2b; color: white; display: inline-block; padding: 4px 10px; font-size: 11px; letter-spacing: 1px; border-radius: 2px;">NEW ORDER</div>
            </div>

            <h2 style="margin: 0 0 20px; font-size: 22px; color: #fff;">$${amountTotal} Order Received</h2>

            <div style="background: #121214; border: 1px solid #2a2a2f; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; font-size: 14px;">
                <tr>
                  <td style="color: #9a9aa0; padding: 4px 0;">Customer</td>
                  <td style="color: #fff; font-weight: 500; padding: 4px 0;">${customerName}</td>
                </tr>
                <tr>
                  <td style="color: #9a9aa0; padding: 4px 0;">Email</td>
                  <td style="color: #fff; padding: 4px 0;">${customerEmail}</td>
                </tr>
                <tr>
                  <td style="color: #9a9aa0; padding: 4px 0;">Order ID</td>
                  <td style="font-family: monospace; color: #fff; padding: 4px 0;">${session.id}</td>
                </tr>
                <tr>
                  <td style="color: #9a9aa0; padding: 4px 0;">Total</td>
                  <td style="color: #fff; font-weight: 600; padding: 4px 0;">$${amountTotal}</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 20px;">
              <a href="https://dashboard.stripe.com/payments/${session.payment_intent}" style="background: #9f1f2b; color: white; padding: 10px 16px; border-radius: 4px; text-decoration: none; font-size: 13px; display: inline-block;">View in Stripe Dashboard →</a>
            </div>

            <div style="font-size: 12px; color: #666;">
              Shipping address and full details are available in your Stripe dashboard.
            </div>
          </div>
        `
      });
    } catch (err) {
      console.error('Failed to send business notification:', err);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  };
};
