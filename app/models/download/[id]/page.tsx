"use client"
import { Database } from "@/app/types/database";
import { Divider, Spinner } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

export default function DownloadModel({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const supabase = createClientComponentClient<Database>();

  const fetchData = async () => {
    try {
      const { data: modelsData, error: modelsError } = await supabase
        .from("models")
        .select("*")
        .eq("id", id)
        .single();
  
      if (modelsError) {
        console.error("Error al consultar modelos:", modelsError);
        setError(modelsError as PostgrestError);
      } else {
        setData(modelsData);
  
        if (data) {
          try {
            const { data: userData, error: userError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.author_id)
            .single();
  
              console.log("Data from profiles:", userData);
              if (userError) {
                setError(userError);
                return;
              }
          
              if (Array.isArray(userData)) {
                setUser(userData[0]);
              }
          } catch (error) {
            console.error("Error al consultar el perfil del autor:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error al consultar modelos:", error);
      setError(error as PostgrestError);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className="container flex flex-col justify-center items-center h-screen pb-24 mx-auto text-center max-w-7xl">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
          This model does <span className="bg-gradient-radial-red text-transparent bg-clip-text">not exist</span>.
        </h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container flex flex-col justify-center items-center h-screen pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
        <Spinner />
      </div>
    );
  }

    if (data.link) {
      window.open(data.link, '_blank');
      window.location.href = data.link;
    } 
  const formatDate = (dateStr: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <main className="container flex flex-col justify-center items-center pb-8 pt-6 gap-5 md:py-10 mx-auto text-center max-w-7xl">
      <div className="overflow-hidden w-full max-w-md md:hover:scale-105 md:active:scale-150 md:active:z-50 rounded-2xl relative shadow-2xl mb-5 gtransition">
        <img src={data.image_url} className="object-fill h-64 w-full"></img>
      </div>
      <h1 className="text-6xl font-bold leading-tight tracking-tighter md:text-8xl my-4">
        {data.name}
      </h1>
      <div>
        <div className="flex justify-between items-center flex-wrap gap-5 w-full">
          <div className="flex flex-col text-left gap-1 flex-grow">
            <p className="text-sm md:text-lg tracking-tight text-neutral-400 text-left">
              Uploaded at {formatDate(data.created_at)}
            </p>
          </div>
          <p className="text-sm md:text-lg tracking-tight text-neutral-400 text-left">
          Created by {user ? user.full_name : 'unknown'}
          </p>
        </div>
        <Divider className="w-full my-1" />
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl my-4">
          We are <span className="bg-gradient-radial bg-clip-text text-transparent">downloading</span> the model{" "}
          <span className="bg-gradient-radial bg-clip-text text-transparent">for you</span>.
        </h2>
      </div>
    </main>
  );
}
