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
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50 max-lg:p-4 overflow-y-auto h-full max-md:pt-52">
      <div className="bg-white/10 backdrop-blur-3xl shadow-xl shadow-white/20 rounded-xl p-6 md:pb-0 shadow-xl md:w-full md:max-w-[110svh] md:h-full md:max-h-[60svh] max-md:w-full max-md:h-fit max-md:mt-12">
        <button 
          className="absolute top-0 right-0 m-4 lg:mt-6 mt-4 bg-white/10 hover:bg-red-500/10 p-2 rounded-xl slow" 
          onClick={onClose}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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
        <div className='flex justify-between max-lg:flex-col lg:pr-12 pt-0'>
        <div className='flex flex-col'>
        <h1 className='text-3xl max-w-2xl max-md:text-left max-md:mt-4 max-md:text-pretty truncate font-semibold'>{data.name}</h1>
        <p className="text-white/70 max-md:mt-2 max-md:text-left pl-0.5 mt-1 mb-2">by <a href={`/${data.author_username || '?'}`} className='hover:underline text-white/80'>{data.author_username || '?'}</a> in {data.server_name || '?'} · <span className='read-font text-sm'>{(() => { const t = Math.round((new Date().getTime() - new Date(data.created_at).getTime()) / (1000 * 60)); return t < 60 ? `${t} minutes` : t < 1440 ? `${Math.floor(t / 60)}h` : `${Math.floor(t / 1440)} days`; })()}</span> ago.</p>
        </div>
        <OptionsModelMenu id={data.id} />
        </div>
            <section className='flex max-md:flex-col gap-2'>
            {data.tags && data.tags.split(',').map((tag, index) => (
            <div key={index} className='rounded-xl bg-white/10 border border-white/10 px-4 max-md:text-center max-md:py-2 text-sm'>
              {tag}
            </div>
            ))}
            </section>
            <div className='flex flex-col gap-4 w-full h-full mt-6'>
            <ModelStats id={data.id}/>
            <div className='flex items-start mt-auto w-full md:max-h-[25svh] md:h-fit h-fit p-4 bg-white/10 max-md:rounded-xl md:rounded-t-xl '>
            {data.tags && data.author_username && data.author_id && <MoreModels tags={data.tags} full_name={data.author_username} id={data.author_id} model_name={data.name}/>}
            </div>
            </div>
        </article>
        </>
        )}
      </div>
    </div>
  );
};

export default ModelPopup;