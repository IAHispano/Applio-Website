"use client"

import Logo from '@/components/navbar/logo';
import { supabaseTV } from '@/utils/database';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [results, setResults] = useState<any[]>([]); 
  const locale = useLocale();

  useEffect(() => {
    const searchQuery = new URLSearchParams(window.location.search).get('search'); 

    if (searchQuery) {
      setSearchTerm(searchQuery);
      searchVideo(searchQuery);
    }
  }, []);

  const searchVideo = async (term: string) => {
    try {
      const { data, error } = await supabaseTV
        .from('videos')
        .select('*')
        .ilike('title', `%${term}%`);

      if (error) {
        throw error;
      }

      if (data) {
        setResults(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <><div className='-mt-12 pt-12'>
      <Logo position='top' />
    </div><div>
        <h1 className='md:mx-44 mx-12 md:mt-12 mt-24 max-md:text-center mb-4 md:text-3xl text-2xl tracking-tight md:tracking-tighter font-bold'>Search results for <span className='tracking-medium'>&quot;{searchTerm}&quot;</span>:</h1>
        <div className='grid grid-cols-1 mb-16 md:mx-44 mx-12 gap-4'>
          {results.map((video, index) => (
            <a key={video.id} href={`${locale}/watch/${video.id}`}>
              <div className="col-span-8 relative w-full md:h-[70svh] h-[20svh] rounded-[12px] overflow-hidden block border border-black/10">
                <img className="w-full h-full object-center" src={`http://img.youtube.com/vi/${video.video_url}/maxresdefault.jpg`} alt="Miniature of a video" />
                <div className="absolute inset-x-0 bottom-0 w-full h-3/4 bg-gradient-to-t from-black to-transparent"></div>
                <p className="absolute inset-x-0 bottom-0 text-white md:text-4xl text-xl font-bold p-4 truncate">{video.title}</p>
                <p className="absolute inset-x-0 md:bottom-12 bottom-8 text-white text-xs p-4 truncate">{video.created_by} at {new Date(video.created_at).toLocaleDateString()}</p>
              </div>
            </a>
          ))}
        </div>
      </div></>
  );
}
