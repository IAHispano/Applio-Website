import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_API_SECRET);

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

  const session = event.data.object;

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const { id, client_reference_id, payment_status } = event.data.object;
      const { priceId, auth_id, type } = event.data.object.metadata;

      console.log({
        priceId,
        payment_id: id,
        user_id: client_reference_id,
        status: payment_status,
        type: type
      });

      if (type === 'donation') {
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
        console.log(session.amount_total)
        const { error } = await supabase
          .from("premium")
          .insert([
            {
              price_id: priceId,
              payment_id: id,
              user_id: client_reference_id,
              status: payment_status,
              type: 'donation',
              amount: session.amount_total
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
                    value: type,
                  },
                  {
                    name: 'Amount:',
                    value: session.amount_total / 100 + '€',
                  },
                  {
                    name: 'Buy by:',
                    value: client_reference_id,
                  },
                  {
                    name: 'Payment ID:',
                    value: id,
                  },
                  {
                    name: 'Price ID:',
                    value: priceId
                  },
                  {
                    name: 'Status:',
                    value: payment_status
                  },
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

      }

      if (type === 'sub') {
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription,
        );
        const end_at = new Date(subscription.current_period_end * 1000);

        const { error } = await supabase
          .from("premium")
          .insert([
            {
              price_id: priceId,
              payment_id: id,
              user_id: client_reference_id,
              status: subscription.status,
              sub_id: subscription.id,
              end_at: end_at,
              type: 'sub',
              amount: session.amount_total
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
            const discordChannelId = process.env.DISCORD_CHANNEL_ID;
            const discordToken = process.env.DISCORD_BOT_TOKEN;
            const message = {
              embeds: [
                {
                  title: 'New client at Applio Premium 🎉',
                  fields: [
                    {
                      name: 'Type:',
                      value: type,
                    },
                    {
                      name: 'Amount:',
                      value: session.amount_total / 100 + '€',
                    },
                    {
                      name: 'Buy by:',
                      value: client_reference_id,
                    },
                    {
                      name: 'Payment ID:',
                      value: id,
                    },
                    {
                      name: 'Price ID:',
                      value: priceId
                    },
                    {
                      name: 'Status:',
                      value: subscription.status
                    },
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
      }

      break;
      case "invoice.payment_failed":
        if (type === 'sub') {
          const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
          const { error } = await supabase
            .from("premium")
            .delete()
            .eq('user_id', client_reference_id);

            const { error2 } = await supabase
              .from('profiles')
              .update({ role: 'user' })
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
                method: 'DELETE',
                headers: {
                  Authorization: `Bot ${discordToken}`,
                },
              });
              console.log('Role removed: ' + response.status);
            } catch (discordError) {
              console.error('Error:', discordError);
              return NextResponse.json({ error: discordError.message }, { status: 400 });
            }
            try {
              const discordChannelId = process.env.DISCORD_CHANNEL_ID;
              const discordToken = process.env.DISCORD_BOT_TOKEN;
              const message = {
                embeds: [
                  {
                    title: 'Error with payment at Applio Premium ❌',
                    fields: [
                      {
                        name: 'Type:',
                        value: type,
                      },
                      {
                        name: 'Buy by:',
                        value: client_reference_id,
                      },
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
                        value: subscription.status
                      },
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                      "text": "Applio Website"
                    },
                    color: 0xff0000, 
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
        }
      break;
      
      case "invoice.upcoming":
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
        const { error } = await supabase
          .from("premium")
          .update({ status: 'upcoming' });

        if (error) {
          console.log(error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
      break;

      case "customer.subscription.deleted":
        if (type === 'sub') {
          const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
          const { error } = await supabase
            .from("premium")
            .delete()
            .eq('user_id', client_reference_id);

            const { error2 } = await supabase
              .from('profiles')
              .update({ role: 'user' })
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
                method: 'DELETE',
                headers: {
                  Authorization: `Bot ${discordToken}`,
                },
              });
              console.log('Role removed: ' + response.status);
            } catch (discordError) {
              console.error('Error:', discordError);
              return NextResponse.json({ error: discordError.message }, { status: 400 });
            }
            try {
              const discordChannelId = process.env.DISCORD_CHANNEL_ID;
              const discordToken = process.env.DISCORD_BOT_TOKEN;
              const message = {
                embeds: [
                  {
                    title: 'Canceled subscription ❌',
                    fields: [
                      {
                        name: 'Type:',
                        value: type,
                      },
                      {
                        name: 'Buy by:',
                        value: client_reference_id,
                      },
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
                        value: subscription.status
                      },
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                      "text": "Applio Website"
                    },
                    color: 0xff0000, 
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
        }

      break;

    default:
      console.log(`Event: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}