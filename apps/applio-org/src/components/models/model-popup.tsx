"use client"
import { Model } from '@/types/modelsTypes';
import { supabase } from '@/utils/database';
import { useState, useEffect } from 'react';
import UserModelPopup from './user-model-popup';
import OptionsModelMenu from './options-model-menu';

const ModelPopup = ({ id, onClose }: { id: string | null, onClose: () => void }) => {
    const [data, setData] = useState<Model | null>()
    const [image, setImage] = useState<string | null>(null)


    useEffect(() => {
        async function getModelInfo(id: string) {
            const {data, error} = await supabase.from("models").select("*").eq("id", id).single();

            if (data) {
                setData(data)
                setImage(data.image_url)
            }

            if (error) {
                setData(null)
                console.log(error)
            }
        }

        getModelInfo(id as string);
    }, [id]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm bg-opacity-50 z-50 max-md:p-4 overflow-y-auto h-full">
      <div className="bg-neutral-800 rounded-xl backdrop-blur-3xl p-6 shadow-xl md:w-4/6 md:h-4/6 max-md:w-full max-md:h-fit max-md:mt-24">
        <button 
          className="absolute top-0 right-0 m-4 hover:text-red-500 slow" 
          onClick={onClose}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        {data && (
        <article className=' w-full h-full'>
        <h1 className='text-3xl max-w-3xl max-md:text-left max-md:mt-4 max-md:text-pretty truncate font-medium'>{data.name}</h1>
        <p className="text-white/70 max-md:mt-2 max-md:text-left pl-0.5">published {(() => { const t = Math.round((new Date().getTime() - new Date(data.created_at).getTime()) / (1000 * 60)); return t < 60 ? `${t} minutes` : t < 1440 ? `${Math.floor(t / 60)}h` : `${Math.floor(t / 1440)} days`; })()} ago.</p>
        {image && (<img src={data.image_url} className='w-full h-[20svh] blur-[1.5px] p-2 rounded-2xl bg-center bg-cover mt-4 opacity-50' onError={() => setImage(null)} alt='Model Image'/>)}
        <section className='grid grid-rows-3 md:grid-cols-4 grid-cols-2 grid-flow-row-dense md:mt-6 mt-4 gap-4 overflow-auto'>
            <div className='flex flex-col text-center w-full border border-white/10 rounded-xl px-4 py-2'>
               <h2 className='text-lg font-semibold'>Epochs</h2>
               <div className='border border-white/10 rounded-xl w-full mx-auto my-1.5'/>
               <p className='read-font'>{data.epochs || '?'}</p> 
            </div>
            <div className='flex flex-col text-center w-full border border-white/10 rounded-xl px-4 py-2'>
               <h2 className='text-lg font-semibold'>Type</h2>
               <div className='border border-white/10 rounded-xl w-full mx-auto my-1.5'/>
               <p className='read-font'>{data.type || '?'}</p> 
            </div>
            <div className='flex flex-col text-center w-full border border-white/10 rounded-xl px-4 py-2'>
               <h2 className='text-lg font-semibold'>Algorithm</h2>
               <div className='border border-white/10 rounded-xl w-full mx-auto my-1.5'/>
               <p className='read-font'>{data.algorithm || '?'}</p> 
            </div>
            <div className='flex flex-col text-center w-full border border-white/10 rounded-xl px-4 py-2'>
               <h2 className='text-lg font-semibold'>Likes</h2>
               <div className='border border-white/10 rounded-xl w-full mx-auto my-1.5'/>
               <p className='read-font'>{data.likes || '?'}</p> 
            </div>
            <div className='flex flex-col text-center w-full border border-white/10 rounded-xl px-4 py-2'>
               <h2 className='text-lg font-semibold'>Uploaded in</h2>
               <div className='border border-white/10 rounded-xl w-full mx-auto my-1.5'/>
               <p className='read-font'>{data.server_name || '?'}</p> 
            </div>
            {data.tags && (
            <>
            {data.tags.split(',').map((tag, index) => (
            <div key={index} className='flex flex-col text-center w-full border border-white/10 rounded-xl px-4 py-2'>
            <h2 className='text-lg font-semibold'>Tag <span className='read-font'>{index}</span></h2>
            <div className='border border-white/10 rounded-xl w-full mx-auto my-1.5'/>
            <p className='read-font'>{tag || '?'}</p> 
            </div>
            ))}
            </>
            )}
            <UserModelPopup id={data?.author_id} />
        </section>
            <OptionsModelMenu id={id as string}/>
        </article>
        )}
      </div>
    </div>
  );
};

export default ModelPopup;

export async function generateMetadata({ params }: { params: { id: number } }) {
  const { data, error } = await supabase
      .from("profiles")
      .select("name, image_url, author_username, created_at")
      .eq("id", params.id)
      .single()
  
  if (error) {
      return {
      title: 'Applio',
      }
  }

  return {
      title: data.name,
      description: `See this model by ${data.author_username} at ${new Date(data.created_at).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })} in Applio.`,
      openGraph: {
          title: data.name,
          images: data.image_url,
          description: `See this model by ${data.author_username} at ${new Date(data.created_at).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })} in Applio.`,
          }  
  }
  }