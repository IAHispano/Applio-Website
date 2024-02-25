import PremiumUI from "@/components/premium/premiumUI"
import { redirect } from "next/navigation";
import { Stripe } from "stripe"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../types/database";
import { cookies } from "next/headers";


async function loadProducts() {
  const stripe = new Stripe(process.env.STRIPE_API_SECRET as any)
  const products = await stripe.prices.list({ active: true, product: 'prod_PbD4vh3AliVRrO'})

  return Promise.all(products.data.map(async (product) => {
    const productDetails = await stripe.products.retrieve(product.product as string);
    return {
      id: product.id,
      currency: product.currency,
      unit_amount: product.unit_amount,
      image: productDetails.images[0], 
      title: productDetails.name,
      description: productDetails.description,
      features: productDetails.features
    };
  }));
}

async function applioPremium() {
    const products = await loadProducts()
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
      data: { session },
    } = await supabase.auth.getSession()
  
  
    if (!session) {
      redirect("/login")
    }
     
  return (
    <main className='min-h-screen flex flex-col justify-start items-center w-full md:px-24 pb-12 mt-4'>
    <PremiumUI products={products} session={session}/>
    </main> 
  )
}

export default applioPremium