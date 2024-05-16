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
          <div className="grid grid-cols-3 gap-4">
          {data?.map((data: any) => (
            <div key={data.id} className="flex flex-cols-2 gap-4 items-center">
              <img src={`https://cjtfqzjfdimgpvpwhzlv.supabase.co/storage/v1/object/public/Images/${data.id}.webp` || data.image_url || `/favicon.ico`} alt={data.name} className="w-[90px] h-[80px] object-fill rounded-3xl" />
              <div className="bg-gradient-to-b from-white/[.03] border border-white/10 to-[#110F0F] rounded-2xl w-[300px] h-full">
              <p className="text-white mt-2 justify-start items-start flex mb-auto max-w-[280px] text-ellipsis pl-2 pr-2 text-left text-sm">{data.name}</p>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    );
};

export default ModelsShowcase;
