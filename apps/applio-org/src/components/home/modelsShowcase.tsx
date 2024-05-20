"use client"

import { supabase } from "@/utils/database";
import { lazy, useEffect, useState } from "react";

const ModelsShowcase= () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true)

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .range(0, 11)
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
      <div className="gap-4 p-4 mt-4 w-full">
        {loading && (<p className="text-center text-xs justify-center flex mx-auto items-center">Loading...</p>)}
        {!loading && (
          <div className="grid md:grid-cols-3 gap-4">
          {data?.map((data: any) => (
            <div key={data.id} className="flex flex-cols-2 gap-4 items-center">
              <img 
                src={`https://cjtfqzjfdimgpvpwhzlv.supabase.co/storage/v1/object/public/Images/${data.id}.webp`}  
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/favicon.ico'; 
                }}
                alt={data.name} 
                className="min-w-[80px] max-w-[80px] h-[80px] object-cover object-top rounded-3xl" 
              />
              <p className="text-white  justify-start items-start flex mb-auto max-w-[280px] text-ellipsis px-2 text-left text-sm border border-white/10 rounded-2xl w-full h-full py-2 bg-white/[0.05]" >{data.name}</p>
              </div>
          ))}
          </div>
        )}
      </div>
    );
};

export default ModelsShowcase;
