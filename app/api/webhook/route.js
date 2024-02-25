import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const { id, client_reference_id, payment_status } = event.data.object;
      const { priceId } = event.data.object.metadata;

      console.log({
        priceId,
        payment_id: id,
        user_id: client_reference_id,
        status: payment_status,
      });

      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
      const { error } = await supabase
        .from("premium")
        .insert([
          {
            price_id: priceId,
            payment_id: id,
            user_id: client_reference_id,
            status: payment_status,
          },
        ]);

        const { error2 } = await supabase
          .from('profiles')
          .update({ role: 'premium' })
          .eq('full_name', client_reference_id);

        if (error) {
          console.log(error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (error2) {
          console.log(error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }

      break;
    default:
      console.log(`Event: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}