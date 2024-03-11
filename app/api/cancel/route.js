import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  const { sub_id, type, user_id } = await request.json();
  console.log('Canceling subscription')

  const stripe = new Stripe(process.env.STRIPE_API_SECRET);

  if (type === 'sub') {
    subscription = await stripe.subscriptions.cancel(sub_id);

    try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
    await supabase.from('premium').delete().eq('user_id', user_id);
    await supabase.from('profiles').update({ role: 'user'}).eq('full_name', user_id);
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
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
                  value: user_id,
                },
                {
                  name: 'Sub ID:',
                  value: sub_id,
                },
                {
                  name: 'Status:',
                  value: 'canceled'
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

  return NextResponse.json({
    'status': 'canceled'
  });
}