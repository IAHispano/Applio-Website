"use client"

// todo

// Remove for local development
export const runtime = 'edge';

import Faq from '@/components/premium/faq';
import Background2 from '@/components/svg/background2';
import { supabase } from '@/utils/database';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  default_price: string;
  marketing_features: {
    name: string;
  }[];
  metadata: {
    description: string;
    type: string;
  };
  price: number;
}

export default function PricingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/getProducts');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyPremium = async (price_id: string, type: string) => {
    const user = await supabase.auth.getUser();
    if (user?.data?.user) {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("role, full_name, id")
        .eq('auth_id', user.data.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile data:', error.message);
        return;
      }

      if (profileData) {
        try {
          const res: Response = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({
              priceId: price_id,
              userId: profileData.id,
              auth_id: user.data.user.id,
              type: type
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await res.json();
          window.location.href = data.url;
        } catch (error) {
          console.error('Error during checkout:', error);
        }
      }
    } else {
      window.location.href = '/login';
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center max-md:mx-4 mt-12">
      <div className="absolute -z-1"><Background2 /></div>
      <div className="p-2 bg-white/10 border border-white/20 items-center text-black leading-none rounded-full flex lg:inline-flex hover:shadow-xl hover:shadow-white/50 slow mb-5" role="alert">
        <span className="font-semibold mx-2 text-left flex-auto text-white">Support Us</span>
      </div>
      <h1 className="md:text-6xl lg:max-w-5xl max-w-xl text-4xl font-bold leading-8">Pricing</h1>
      <p className='md:mb-12 text-white/80 md:max-w-md max-w-[300px] text-center my-4'>Discover the ideal plan to fuel your business growth. Our pricing options are carefully crafted to cater to businesses.</p>
      {loading && <p className='text-white/60 text-sm'>Loading...</p>}
      {error && <p className='text-white/60 text-sm'>{error}</p>}
      {!products && !loading && <p className='text-white/60 text-sm'>Not found products, please try again.</p> }
      {products && (
      <div className='grid md:grid-flow-col gap-4 h-full w-full justify-center mx-auto items-center'>
        {products.map((product) => (
          <button onClick={() => handleBuyPremium(product.default_price, product.metadata.type)} key={product.id} className='flex flex-col justify-start items-start m-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 cursor-pointer h-full max-w-[30svh] p-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-white/20 slow shadow-white/10 border border-white/10'>
            <h2 className='text-3xl font-medium text-left'>{product.name}</h2>
            <h3 className='text-white/80 mt-0.5 text-sm text-left'>{product.description}</h3>
            {product.price != 0 && (<p className='font-bold text-4xl mt-4 px-0.5 text-left'><span className='read-font'>${product.price / 100}</span>  <span className='text-lg font-light'>per month.</span></p>)}
            {product.price === 0 && (<p className='font-bold text-3xl mt-5 px-0.5 text-left'><span className='read-font'>Custom</span> <span className='text-lg font-light'>one time.</span></p>)}
            <div className='w-full rounded-xl h-0.5 bg-white/60 my-4'/>
            <ul className='list-disc list-outside px-4 max-w-[250px] text-left pb-4'>
              {product.marketing_features.map((feature, index) => (
                <li key={index} className='py-2'>{feature.name}.</li>
              ))} 
            </ul>
          </button>
        ))}
      </div>
      )}
      <Faq />
    </main>
  );
}
