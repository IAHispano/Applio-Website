import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';

// Remove for local development
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { priceId, userId, auth_id, type } = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  let session;

  if (type === 'donation') {
    session = await stripe.checkout.sessions.create({
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
        auth_id,
        userId,
        type
      },
    });
  }

  if (type === 'sub') {
    session = await stripe.checkout.sessions.create({
      mode: 'subscription',
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
        auth_id,
        userId,
        type
      },
    });
  }

  return NextResponse.json({
    url: session?.url,
    sessionId: session?.id,
  });
}