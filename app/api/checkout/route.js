import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

export async function POST(request) {
  const { priceId, userId, auth_id } = await request.json();

  const stripe = new Stripe(process.env.STRIPE_API_SECRET);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `http://applio.org/premium/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: 'http://applio.org/premium',
    client_reference_id: userId,
    metadata: {
      priceId,
      auth_id
    },
  });

  return NextResponse.json({
    url: session.url,
    sessionId: session.id,
  });
}
