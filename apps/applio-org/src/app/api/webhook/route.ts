import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// todo

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig || !endpointSecret || !body) {
        console.error("Missing Stripe webhook signature or secret.");
        return NextResponse.json({ error: "Unexpected error, please try again later." }, { status: 400 });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (error: any) {
        console.error("Error verifying Stripe webhook signature:", error.message);
        return NextResponse.json({ error: "Webhook signature verification failed." }, { status: 400 });
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            const payment_intent = event.data.object as Stripe.PaymentIntent;
            console.log("PaymentIntent succeeded:", payment_intent.id);
            if (payment_intent.metadata.type === 'donation') {
                const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_KEY as string);
                const { error } = await supabase
                .from("premium")
                .insert([
                  {
                    price_id: event.data.object.metadata.priceId,
                    payment_id: event.data.object.metadata.id,
                    user_id: event.data.object.metadata.userId,
                    status: event.data.object.status,
                    type: 'donation',
                    amount: event.data.object.amount
                  },
                ]);
      
                if (error) {
                  console.log(error);
                  return NextResponse.json({ error: error.message }, { status: 400 });
                }

                try {
                    const discordChannelId = process.env.DISCORD_CHANNEL_ID;
                    const discordToken = process.env.DISCORD_BOT_TOKEN;
                    const message = {
                      embeds: [
                        {
                          title: 'New donation at Applio Premium 🎉',
                          fields: [
                            {
                              name: 'Type:',
                              value: event.data.object.metadata.type,
                            },
                            {
                              name: 'Amount:',
                              value: event.data.object.amount / 100 + '$',
                            },
                            {
                              name: 'Buy by:',
                              value: event.data.object.metadata.userId,
                            },
                            {
                              name: 'Payment ID:',
                              value: event.data.object.id,
                            },
                            {
                              name: 'Price ID:',
                              value: event.data.object.metadata.priceId
                            },
                            {
                              name: 'Status:',
                              value: event.data.object.status
                            },
                          ],
                          timestamp: new Date().toISOString(),
                          footer: {
                            "text": "Applio Website"
                          },
                          color:  0xFFFFFF, 
                        }
                      ]
                    };
                  
                    const response = await fetch(`https://discord.com/api/v9/channels/${discordChannelId}/messages`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${discordToken}`,
                      },
                      body: JSON.stringify(message),
                    });
                  
                    console.log('Log send.');
                    return NextResponse.json({ message: "Donation processed successfully." }, { status: 200 });
                  } catch (discordError: any) {
                    console.error('Error:', discordError);
                    return NextResponse.json({ error: discordError.message }, { status: 400 });
                  }
            }
        default:
            console.log("Event type:", event.type);
            return NextResponse.json({ arguments: `Event type ${event.type}` }, { status: 400 });
    }
}
