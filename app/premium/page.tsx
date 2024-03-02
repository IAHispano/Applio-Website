import PremiumUI from "@/components/premium/premiumUI"
import { redirect } from "next/navigation";
import { Stripe } from "stripe"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../types/database";
import { cookies } from "next/headers";


async function loadProducts() {
  const stripe = new Stripe(process.env.STRIPE_API_SECRET as any)
  const productIds = ['prod_PbD4vh3AliVRrO', 'prod_PfFAVxGWSvVS4T'];
  const products = await Promise.all(productIds.map(async (productId) => {
    const prices = await stripe.prices.list({ active: true, product: productId });
    return Promise.all(prices.data.map(async (price) => {
      const productDetails = await stripe.products.retrieve(price.product as string);
      return {
        id: price.id,
        currency: price.currency,
        unit_amount: price.unit_amount,
        image: productDetails.images[0], 
        title: productDetails.name,
        description: productDetails.description,
        features: productDetails.features
      };
    }));
  }));
  return products.flat();
}

async function applioPremium() {
  const productsNested = await loadProducts(); 
  const products = productsNested.flat(); 
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
      data: { session },
    } = await supabase.auth.getSession()
  
  
    if (!session) {
      redirect("/login")
    }
     
  return (
    <main className='min-h-screen flex flex-col justify-start items-center w-full md:px-24 pb-12 md:mt-4 px-5'>
    <PremiumUI products={products} session={session}/>
    </main> 
  )
}

export default applioPremium