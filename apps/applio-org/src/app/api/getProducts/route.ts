import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export async function GET(req: NextRequest) {
  try {
    const productIds = ['prod_PiIOpTzQQA6Wwe', 'prod_PfF3QNbRD0cepH'];

    const products = await Promise.all(productIds.map(async (productId) => {
      try {
        const product = await stripe.products.retrieve(productId);
        if (product.default_price && typeof product.default_price === 'string') {
          const price = await stripe.prices.retrieve(product.default_price);
          return {
            ...product,
            price: price.unit_amount_decimal || 0,
          };
        } else {
          return null; 
        }
      } catch (error) {
        console.error(`Error retrieving product ${productId}:`, error);
        return null; 
      }
    }));

    const formattedProducts = products.filter((product) => product !== null);

    return NextResponse.json(formattedProducts);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
