"use client"

import { Database } from '@/app/types/database'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { CheckCircleIcon } from 'lucide-react'
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'

function PremiumUI({ products, session }: { products: any[], session: any}) {
    const supabase = createClientComponentClient<Database>()
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const userId = data.full_name
    const id = data.id
    
    useEffect(() => {
        async function fetchData() {
            const { data: userData } = await supabase
                .from("profiles")
                .select("role, full_name, id")
                .eq('auth_id', session.user.id)
                .single()
    
            if (userData) {
                setData(userData);
            }
            setLoading(false);
        }
    
        fetchData();
    }, []);


  return (
    <>
      <motion.div style={{ background: 'radial-gradient(100% 100% at 50% 0%,#222 0%,#09090b 100%)' }} className="w-full h-full absolute top-0 left-0 " initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}></motion.div>
      <section className='min-h-[100vh] p-3 overflow-hidden w-full overflow-x-hidden overflow-y-auto rounded-2xl z-20 relative px-12'>
        <div className='px-3 mb-12'>
          <div className='max-md:max-w-sm'>
            <motion.h1 initial={{ marginLeft: 400, fontSize: '70px' }} animate={{ marginLeft: 0, fontSize: '60px' }} transition={{ duration: 0.3, delay: 1 }} className='font-bold tracking-tight gtransition text-white text-center'>Applio <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.0 }} className='text-[#00AA68] md:text-7xl text-5xl text-center'>Premium</motion.span></motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 3 }} className='text-center'>A way to support each other and receive unique rewards.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 3 }} className="border border-white/10 rounded-lg my-3 max-w-xl justify-center flex items-center text-center mx-auto" />
          </div>
        </div>
        <motion.div className='' animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1, delay: 3 }}>
          {products.map((product, index) => (
            <div key={index} className="rounded-xl max-w-sm p-4 sm:p-10 bg-white/10 mx-auto justify-center items-center flex flex-col drop-shadow-xl border border-white/10">
              <img
                src={product.image}
                alt={product.title}
                height="400"
                width="400"
                className="object-contain rounded-lg border border-black/10" />
              <p className="text-3xl mt-4 mb-2 font-bold text-neutral-200">
                {product.title}
              </p>
              <p className="text-md text-center text-neutral-200 mb-4 font-mono">
                {product.description}
              </p>
              <ul className='list-outside flex-col justify-center items-center mx-auto'>
              {product.features.map((feature: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined }, index: Key | null | undefined) => (
                <li key={index} className="text-sm text-center font-mono text-neutral-400">
                    {feature.name}
                </li>
                ))}
                </ul>            
              {data.role !== 'premium' && (
              <><button className="rounded-lg px-8 py-3 text-white flex flex-col items-center space-x-1 mt-8 text-xs font-bold bg-neutral-900 hover:bg-neutral-600 gtransition border border-white/10"
                  onClick={async () => {
                    const res: Response = await fetch('/api/checkout', {
                      method: 'POST',
                      body: JSON.stringify({
                        priceId: product.id,
                        userId: userId,
                        auth_id: id
                      }),
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    })
                    const data = await res.json()
                    window.location.href = data.url
                  } }
                >
                  <span className="rounded-full text-2xl px-2 py-0 text-white font-mono text-center">
                    {(product.unit_amount / 100).toFixed(2)} €
                  </span>
                </button><span className="rounded-full text-xs m-1 mt-3 text-neutral-300 font-mono font-light text-center">
                    One time
                  </span></>
              )}
              {data.role === 'premium' && (
                <div className="rounded-lg px-12 py-3 text-white flex items-center space-x-1 mt-8 text-xs font-bold bg-green-500/40 gtransition border border-white/10"
                >
                <span className="rounded-full text-2xl px-2 py-0 text-white font-mono">
                <CheckCircleIcon />
                </span>
            </div>
              )}
            </div>
          ))}
        </motion.div>
      </section>
    </>
  )
}

export default PremiumUI
