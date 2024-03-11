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
    <article className='grid grid-cols-1md:grid-cols-8 w-full grid-rows-1 gap-3 gtransition max-w-6xl my-6'>
    {data.role !== "premium" && (
    <section className='md:col-span-8 h-full w-full flex justify-center text-center relative bg-[#000] md:rounded-[2.5rem] rounded-b-[2.5rem]'>
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2}} style={{background: 'radial-gradient(100% 100% at 50% 100%,#222 0%,#000 100%)'}} className='w-full h-full absolute top-0 left-0 md:rounded-[2.5rem] rounded-b-[2.5rem]'></motion.div>
      <div className='my-24 flex-col items-center text-center mx-auto flex z-10'>
        <svg className='text-center content-center text-[#00AA68] w-64 h-64' viewBox="0 0 234 262" xmlns="http://www.w3.org/2000/svg">
        <path d="M135.513 62.3751C147.067 58.1154 158.525 55.8833 170.37 56.3098C187.624 56.6716 200.645 64.798 211.496 77.4453C223.714 91.6854 230.765 108.314 232.816 127.159C233.997 138.015 233.579 148.867 232.096 159.712C230.079 174.461 226.723 188.814 220.711 202.377C215.539 214.046 210.122 225.671 201.937 235.467C191.702 247.715 179.377 256.934 163.96 261.07C158.673 262.489 153.394 262.284 148.174 260.46C140.316 257.715 132.336 255.377 124.382 252.951C120.685 251.823 117.075 251.778 113.381 252.779C103.715 255.397 94.1003 258.262 84.352 260.501C70.7036 263.635 58.4583 260.589 47.8815 250.749C31.5163 235.525 20.0427 216.888 11.6532 196.056C6.3285 182.835 2.38509 169.159 1.11337 154.889C-1.00264 131.144 2.09256 108.292 14.5403 87.6696C21.3562 76.3778 30.1515 66.9244 41.8262 60.7726C48.9133 57.0381 56.5469 55.9969 64.3976 56.211C77.8502 56.5777 90.9126 59.6333 104.022 62.364C104.929 62.553 105.843 62.7072 106.758 62.8502C106.882 62.8695 107.029 62.7277 107.387 62.5514C106.487 59.0799 104.779 55.9439 102.981 52.9121C98.641 45.5932 93.7666 38.6507 88.6491 31.8884C87.094 29.8335 85.2169 28.8951 82.6445 28.9401C77.21 29.0352 75.1317 25.9196 76.8318 20.5179C78.6004 14.8982 83.636 13.0338 88.4334 16.1936C90.0258 17.2423 91.34 18.575 92.5448 20.0585C97.7514 26.4697 102.077 33.4992 106.113 40.7275C108.181 44.4316 109.465 48.471 110.632 52.5545C110.929 53.5964 111.012 54.7785 112.093 55.6003C113.53 54.3577 113.268 52.5027 113.421 50.9983C114.94 36.0447 122.093 24.6043 133.415 15.5219C141.19 9.28455 149.27 3.72894 158.812 0.812341C159.702 0.54056 160.606 0.301193 161.517 0.130463C165.002 -0.521938 167.028 1.30135 167.459 4.9527C169.472 22.037 162.663 35.4978 151.473 47.2382C147.213 51.707 142.602 55.7337 137.741 59.4719C136.959 60.073 136.013 60.546 135.513 62.3751Z" fill="#EAEAEA"/>
        </svg>
        <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 2.5}} className='text-5xl mt-8 font-bold'>Applio <span className='text-[#00AA68]'>Premium</span> is here</motion.h1>
      </div>
    </section>
    )}
    {data.role === "premium" && (
    <section className='md:col-span-8 h-full w-full flex justify-center text-center relative bg-[#000] md:rounded-[2.5rem] rounded-b-[2.5rem]'>
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2}} style={{background: 'radial-gradient(100% 100% at 50% 100%,#00AA68 0%,#000 100%)'}} className='w-full h-full absolute top-0 left-0 md:rounded-[2.5rem] rounded-b-[2.5rem]'></motion.div>
    <div className='my-24 flex-col items-center text-center mx-auto flex z-10'>
      <svg className='text-center content-center text-[#00AA68] w-64 h-64' viewBox="0 0 234 262" xmlns="http://www.w3.org/2000/svg">
      <path d="M135.513 62.3751C147.067 58.1154 158.525 55.8833 170.37 56.3098C187.624 56.6716 200.645 64.798 211.496 77.4453C223.714 91.6854 230.765 108.314 232.816 127.159C233.997 138.015 233.579 148.867 232.096 159.712C230.079 174.461 226.723 188.814 220.711 202.377C215.539 214.046 210.122 225.671 201.937 235.467C191.702 247.715 179.377 256.934 163.96 261.07C158.673 262.489 153.394 262.284 148.174 260.46C140.316 257.715 132.336 255.377 124.382 252.951C120.685 251.823 117.075 251.778 113.381 252.779C103.715 255.397 94.1003 258.262 84.352 260.501C70.7036 263.635 58.4583 260.589 47.8815 250.749C31.5163 235.525 20.0427 216.888 11.6532 196.056C6.3285 182.835 2.38509 169.159 1.11337 154.889C-1.00264 131.144 2.09256 108.292 14.5403 87.6696C21.3562 76.3778 30.1515 66.9244 41.8262 60.7726C48.9133 57.0381 56.5469 55.9969 64.3976 56.211C77.8502 56.5777 90.9126 59.6333 104.022 62.364C104.929 62.553 105.843 62.7072 106.758 62.8502C106.882 62.8695 107.029 62.7277 107.387 62.5514C106.487 59.0799 104.779 55.9439 102.981 52.9121C98.641 45.5932 93.7666 38.6507 88.6491 31.8884C87.094 29.8335 85.2169 28.8951 82.6445 28.9401C77.21 29.0352 75.1317 25.9196 76.8318 20.5179C78.6004 14.8982 83.636 13.0338 88.4334 16.1936C90.0258 17.2423 91.34 18.575 92.5448 20.0585C97.7514 26.4697 102.077 33.4992 106.113 40.7275C108.181 44.4316 109.465 48.471 110.632 52.5545C110.929 53.5964 111.012 54.7785 112.093 55.6003C113.53 54.3577 113.268 52.5027 113.421 50.9983C114.94 36.0447 122.093 24.6043 133.415 15.5219C141.19 9.28455 149.27 3.72894 158.812 0.812341C159.702 0.54056 160.606 0.301193 161.517 0.130463C165.002 -0.521938 167.028 1.30135 167.459 4.9527C169.472 22.037 162.663 35.4978 151.473 47.2382C147.213 51.707 142.602 55.7337 137.741 59.4719C136.959 60.073 136.013 60.546 135.513 62.3751Z" fill="#EAEAEA"/>
      </svg>
      <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 2.5}} className='text-5xl mt-8 font-bold'>You are <span className='text-white'>Premium</span></motion.h1>
    </div>
  </section>
    )}
    <motion.section initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 3.5}} className='md:col-span-3 bg-[#222] h-full w-full rounded-3xl flex justify-center text-center mt-3'>
    <div className='m-4'>
    <h2 className='text-3xl font-bold tracking-tighter text-balance'>What is it?</h2>
    <p className='text-justify text-md max-w-3xl p-1 mt-2'>Applio Premium is conceived as a special membership within the Applio platform. Although it does not have significant advantages compared to a standard account, it offers a number of exclusive features. </p>
    </div>
    </motion.section>
    <motion.section initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 3.5}} className='md:col-span-5 bg-[#222] h-full w-full rounded-3xl flex justify-center text-center mt-3'>
    <div className='m-4'>
    <h2 className='text-3xl font-bold tracking-tighter text-balance'>Why?</h2>
    <p className='text-justify text-md max-w-3xl p-1 mt-2'>By subscribing to this membership, users contribute directly to the sustainability of this website. Your support is crucial for our continuity and to continue offering an excellent service. Join Applio Premium and become part of our community.</p>
    </div>
    </motion.section>
    {products.map((product, index) => (
      <motion.section initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 3.5}} className='md:col-span-8 bg-[#222] h-full w-full rounded-3xl flex max-md:flex-col justify-between text-center relative mt-6' key={index}>
      <div className='m-4 flex items-center '>
        <img className='rounded-3xl mr-6 hidden md:block' width='200px' height='200px' src={product.image} alt='product image'/>
        <div>
          <h2 className='text-3xl font-bold tracking-tighter text-left mb-4'>{product.title}</h2>
          {product.features.map((feature: any, index: any) => (
            <li key={index} className="text-sm text-left font-mono text-neutral-400 list-outside py-0.5">
              {feature.name}
            </li>
          ))}
        </div>
      </div>
      {(data.role !== 'premium' || product.title === 'Donation') && (
      <button className="md:absolute md:bottom-0 md:right-0 md:m-4 bg-neutral-900 hover:bg-neutral-600 gtransition border border-white/10 md:rounded-xl px-4 py-1.5 w-[180px]"
        onClick={async () => {
          const res: Response = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({
              priceId: product.id,
              userId: userId,
              auth_id: id,
              type: product.type
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await res.json()
          window.location.href = data.url
        } }> 
        
          <h2 className='text-3xl font-bold'>
            {product.unit_amount !== null 
              ? `${(product.unit_amount / 100).toFixed(2)} €` 
              : 'Custom'}
          </h2>
          <p className='text-[10px] mt-1 font-light text-neutral-300'>{product.type === 'sub' ? 'per month.' : 'one time.' }</p>
      </button>
      )}
      {data.role === 'premium' && product.title !== 'Donation' && (
        <div className="md:absolute md:bottom-0 md:right-0 md:m-4 bg-green-500/40 gtransition border border-white/10 md:rounded-xl px-6 py-2"> 
          <CheckCircleIcon />
        </div>
      )}
    </motion.section>
    ))}
    </article>
  )
}

export default PremiumUI
