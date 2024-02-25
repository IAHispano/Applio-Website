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
      const { priceId, auth_id } = event.data.object.metadata;

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

        try {
          const discordUrl = `https://discord.com/api/v9/guilds/1096877223765606521/members/${auth_id}/roles/1135641199420653702`;
          const discordToken = process.env.DISCORD_BOT_TOKEN;
          const response = await fetch(discordUrl, {
            method: 'PUT',
            headers: {
              Authorization: `Bot ${discordToken}`,
            },
          });
          console.log('Role assigned');
        } catch (discordError) {
          console.error('Error:', discordError);
          return NextResponse.json({ error: discordError.message }, { status: 400 });
        }

        try {
          const discordChannelId = '1164454816005771355'; 
          const discordToken = process.env.DISCORD_BOT_TOKEN;
          const message = {
            embeds: [
              {
                title: 'New client at Applio Premium 🎉',
                fields: [
                  {
                    name: 'Payment ID:',
                    value: id,
                  },
                  {
                    name: 'Price ID:',
                    value: priceId
                  },
                  {
                    name: 'Payment status:',
                    value: payment_status
                  },
                  {
                    name: 'Username:',
                    value: client_reference_id,
                  }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                  "text": "Applio Website"
                },
                color: 0x00ff00, 
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
        } catch (discordError) {
          console.error('Error:', discordError);
          return NextResponse.json({ error: discordError.message }, { status: 400 });
        }
        
      break;
    default:
      console.log(`Event: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}