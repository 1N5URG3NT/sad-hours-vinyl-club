// netlify/functions/create-checkout-session.js
// Creates a real Stripe Checkout Session from the cart

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { cart, customerEmail, customerName } = JSON.parse(event.body || '{}');

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Cart is empty' })
      };
    }

    // Basic validation
    if (!customerEmail || !customerEmail.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid customer email is required' })
      };
    }

    // Build Stripe line items from our cart
    const lineItems = cart.map(item => {
      // Stripe expects price in cents
      const unitAmount = Math.round(item.unitPrice * 100);

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.name} — ${item.size}`,
            description: `${item.finish} • ${item.color}`,
            // You can add images here later if you host them
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    // Calculate shipping (simple logic matching old site)
    const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const shippingAmount = subtotal > 120 ? 0 : 1200; // $12 in cents

    if (shippingAmount > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
          },
          unit_amount: shippingAmount,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerEmail || undefined,
      success_url: `${process.env.URL || 'http://localhost:8888'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'http://localhost:8888'}/#shop?payment=cancelled`,
      metadata: {
        customerName: customerName || 'Sad Hours Customer',
        orderSource: 'sad-hours-vinyl-club',
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    console.error('[Sad Hours] Stripe checkout error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'We were unable to start the payment process. Please try again or contact us directly.',
        code: error.code || 'unknown'
      })
    };
  }
};
