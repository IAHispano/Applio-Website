"use client"

import { supabase } from "@/utils/database";
import { lazy, useEffect, useState } from "react";

const TestimonialsShowcase= () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true)

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .range(0, 3)
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error);
        setData(data)
        setLoading(false)
      }
      console.log(data)
      setData(data)
      setLoading(false)
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div className="gap-4 md:p-4 mt-12 w-full">
        {loading && (<p className="text-center text-xs justify-center flex md:mx-auto items-center">Loading...</p>)}
        {!loading && (
          <div className="flex md:flex-cols-3 max-md:flex-col gap-6 h-full w-full justify-center ">
          {data?.map((data: any) => (
            <article key={data.id} className="bg-white/[.03] hover:bg-white/10 hover:rounded-xl md:hover:-mt-6 slow rounded-t-xl p-4 md:w-[400px] md:h-[200px] relative mx-4 max-md:rounded-2xl">
            <div className="flex flex-col items-start justify-start">
              <p className="font-bold text-lg text-left md:max-w-[100%] md:min-h-[100px] md:line-clamp-4 overflow-hidden break-words max-w-[300px]" >{data.text}</p>
            </div>
            <div className="md:absolute bottom-2 right-2 max-md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 md:w-[90px]" fill="none">
            <path opacity="0.1" d="M84 18.0282C84 27.0423 82.0268 35.3052 78.0805 42.8169C74.1342 50.3286 68.3087 56.0563 60.604 60L51.0201 52.1127C55.3423 50.6103 59.1007 47.3239 62.2953 42.2535C66.0537 36.9953 67.9329 32.2066 67.9329 27.8873H49.6107V0H84V18.0282ZM34.3893 18.0282C34.3893 26.8545 32.3221 35.3052 28.1879 43.3803C23.8658 51.4554 18.1342 56.9953 10.9933 60L1.4094 52.1127C5.73154 50.6103 9.48993 47.3239 12.6846 42.2535C16.443 36.9953 18.3221 32.2066 18.3221 27.8873H0V0H34.3893V18.0282Z" fill="white"/>
            </svg>
            </div>
            <div className="flex flex-col text-left md:mt-2">
            <p className="font-medium text-sm">{data.from}</p>
            <div className="flex flex-cols-2 gap-1 text-sm text-wrap">
            {data.title && (<p>{data.title}</p>)}{data.title && data.company && (<span>from</span>)}{data.company && (<p>{data.company}</p>)}
            </div>
            </div>
            </article>
          ))}
          </div>
        )}
      </div>
    );
};

export default TestimonialsShowcase;
