"use client";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

export default function Team() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<{ id: number, avatar_url: string, full_name: string }>>([])

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('An error has occurred.');
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'admin');
  
        if (error) {
          handleError('An error has occurred');
          console.error(error);
        } else {
          setData(data || []);
        }
      } catch (error) {
        handleError('An error has occurred');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (loading || !data || data.length === 0) {
    return (
    <div className="justify-center items-center flex flex-col h-44">
    <div
        className="text-white h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]">
    </div>
    </div> );
  }

  return (
    <div className="md:justify-center md:items-center flex flex-col md:mx-auto ">
    <div className="md:my-10 my-4 grid grid-cols-2 gap-x-5 gap-y-10 xs:grid-cols-3 sm:grid-cols-4">
      {data.map((item: any) => (
        <a className="flex flex-col" key={item.id} href={`/user/${item.full_name}`}>
          <img className="m-0 inline-flex rounded-md object-cover !xs:w-36 !xs:h-36 !sm:w-40 !sm:h-40 h-32 w-32 cursor-pointer gtransition" src={item.avatar_url || '/aihispano_logo.png'} alt={item.full_name} 
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = '/aihispano_logo.png';
        }}/>
          <h3 className="mb-0 mt-4 text-white">{item.full_name}</h3>
        </a>
      ))}
    </div>
    <p className="md:text-sm text-xs text-gray-400 py-4">also all the awesome open source contributors at GitHub...</p>
    <a href="https://github.com/IAHispano/Applio?tab=readme-ov-file#contributors" rel="noreferrer" target="_blank">
    <img  src="https://contrib.rocks/image?repo=IAHispano/Applio-RVC-Fork" alt="Github collaborators"/>
    </a>
    </div>
  );
}
