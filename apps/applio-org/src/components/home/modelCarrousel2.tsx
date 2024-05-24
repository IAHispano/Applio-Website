"use client"

import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";
import Marquee from "../magicui/marquee";

const ModelsShowcase1 = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .range(0, 20)
      .eq('server_name', 'AI Hispano')
      .order('created_at', {ascending: false});

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="gap-4 w-full embla select-none overflow-hidden">
      {loading && (<p className="text-center text-xs justify-center flex mx-auto items-center">Loading...</p>)}
      {!loading && (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
          <Marquee pauseOnHover reverse className="[--duration:60s] pointer-events-none flex w-full h-full">
          {data?.map((item: any) => (
            <div key={item.id} className="md:w-[200px] md:h-[280px] w-44 h-44">
            <img 
            src={`https://cjtfqzjfdimgpvpwhzlv.supabase.co/storage/v1/object/public/Images/${item.id}.webp`}  
            onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/favicon.ico'; 
            }}
            alt={item.name} 
            className="h-full w-full object-cover object-top rounded-3xl bg-white/10" 
            />
            </div>
          ))}
          </Marquee>
          </div>
      )}
    </div>
  );
};

export default ModelsShowcase1;
