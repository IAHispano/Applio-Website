"use client"
import { Model } from '@/types/modelsTypes';
import { supabase } from '@/utils/database';
import { useState, useEffect } from 'react';
import OptionsModelMenu from './options-model-menu';
import ModelStats from './model-stats';
import MoreModels from './more-models';

const ModelPopup = ({ id, onClose }: { id: string | null, onClose: () => void }) => {
    const [data, setData] = useState<Model | null>()
    const [image, setImage] = useState<string | null>(null)
    const [error, setError] = useState(false)
    const [loading, setLoading]  = useState(true)

    useEffect(() => {
        async function getModelInfo(id: string) {
            const {data, error} = await supabase.from("models").select("*").eq("id", id).single();

            if (data) {
                setData(data)
                setImage(data.image_url)
                setLoading(false)
            }

            if (error) {
                setData(null)
                console.log(error)
                setError(true)
            }
        }

        getModelInfo(id as string);
    }, [id]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50 max-md:p-4 overflow-y-auto h-full max-md:pt-52">
      <div className="bg-white/10 backdrop-blur-3xl shadow-xl shadow-white/20 rounded-xl p-6 shadow-xl md:w-full md:max-w-[110svh] md:h-full md:max-h-[70svh] max-md:w-full max-md:h-fit max-md:mt-12">
        <button 
          className="absolute top-0 right-0 m-4 hover:text-red-500 slow" 
          onClick={onClose}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        {error && !data && (
          <article className='flex flex-col justify-center items-center m-auto w-full h-full text-center p-4'>
          <h1 className='text-2xl'>We have not found the model you are looking for</h1>
          <p className='read-font text-[10px] my-4'>ID: {id}</p>
          </article>
        )}
        {loading && (
          <article className='w-full h-full z-50 flex flex-col'>
            <h1 className='text-xl max-w-3xl max-md:text-left max-md:mt-4 max-md:text-pretty truncate font-semibold pb-6 flex justify-center items-center mx-auto text-white/80'>Loading...</h1>
          </article>
        )}
        {data && !error && !loading && (
        <>
        <article className='w-full h-full z-50 flex flex-col'>
        <h1 className='text-3xl max-w-3xl max-md:text-left max-md:mt-4 max-md:text-pretty truncate font-semibold pb-6'>{data.name}</h1>
        <p className="text-white/70 max-md:mt-2 max-md:text-left pl-0.5">by <a href={`/${data.author_username || '?'}`} className='hover:underline text-white/80'>{data.author_username || '?'}</a> in {data.server_name || '?'} · <span className='read-font text-sm'>{(() => { const t = Math.round((new Date().getTime() - new Date(data.created_at).getTime()) / (1000 * 60)); return t < 60 ? `${t} minutes` : t < 1440 ? `${Math.floor(t / 60)}h` : `${Math.floor(t / 1440)} days`; })()}</span> ago.</p>
            <section className='flex max-md:flex-col gap-2 mt-2 mb-6 '>
            {data.tags && data.tags.split(',').map((tag, index) => (
            <div key={index} className='rounded-xl bg-white/10 border border-white/10 px-4 max-md:text-center max-md:py-2 text-sm'>
              {tag}
            </div>
            ))}
            </section>
            <ModelStats id={data.id}/>
            {data.image_url && (
            <div className='flex items-center my-auto w-full mt-6 h-[300px] rounded-xl bg-opacity-50 blur-[3px]'>
              <img src={data.image_url} onError={(e) => (e.target as HTMLImageElement).src = "/not-found.png"} className='bg-none w-full h-full rounded-xl shadow-2xl shadow-white/10'/>
            </div>
            )}
            <div className='flex items-end mt-auto w-full h-full'>
            {data.tags && data.author_username && data.author_id && <MoreModels tags={data.tags} full_name={data.author_username} id={data.author_id} />}
            </div>
            <OptionsModelMenu id={data.id} />
        </article>
        </>
        )}
      </div>
    </div>
  );
};

export default ModelPopup;