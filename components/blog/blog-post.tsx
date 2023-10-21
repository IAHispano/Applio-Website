"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PostgrestError } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/types/database";
import { Button, Divider, Link } from "@nextui-org/react";

export default function BlogPost({ id }: { id: string}) {
        const supabase = createClientComponentClient<Database>(); 
        const [data, setData] = useState<any[] | null>(null);
        const [error, setError] = useState<PostgrestError | null>(null);
        useEffect(() => {
          async function fetchData() {
            // Fetch user data based on full name
            const { data: userData, error: userError } = await supabase
              .from("blog")
              .select("*")
              .eq("id", id)
            if (userError) {
              setError(userError);
              return;
            }
            setData(userData);
          }
        
          fetchData();
        }, );
    
        const formatDate = (dateStr: string | number | Date) => {
            const options: Intl.DateTimeFormatOptions = {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            };
            return new Date(dateStr).toLocaleDateString(undefined, options);
          };
          function convertMarkdownToHTML(text: string) {
            const modifiedText = text.replace(/\*\*(.*?)\*\*/g, '<h2 className="text-3xl text-white">$1</h2>');
          
            const textWithLineBreaks = modifiedText.replace(/\n/g, '<br>');
          
            return textWithLineBreaks;
          }
    
      return (
        <div className="text-black dark:text-white">
        {data &&
          data?.map((item, index) => (
        <div ><div className="h-[48rem] absolute w-full pointer-events-none overflow-hidden">
                  <div className="h-96 top-0 absolute w-full scale-125 rounded-2xl blur-3xl pointer-events-none dark:block hidden">
                      <img className="z-10 absolute top-0 left-0 w-full h-full object-cover object-center" src={item.image_url}>
                      </img>
                  </div>
              </div>
              <main className="w-full pt-16 flex flex-col top-0 justify-start items-center text-center min-h-screen overflow-x-hidden relative">
                <div className="flex justify-center  sm:justify-between items-center flex-wrap gap-5 gtransition">
              <Button  variant="flat" className="text-white dark:bg-neutral-950/40 bg-neutral-950/60 gtransition" as={Link} href="/blog">
                Return
              </Button>
              <Button variant="shadow" className="bg-green-500 dark:bg-white dark:text-black gtransition shadow-lg shadow-green-500 dark:shadow-lg dark:shadow-white" as={Link} href="https://twitter.com/intent/tweet?text=Check out the new post on Applio blog! www.applio.org/blog/" target="_blank">
                Share
              </Button>
              </div>
              <div className="px-5 w-full flex justify-center items-center">
                <div className="pt-5 pb-10 z-10 flex justify-center items-center gap-5 flex-col w-full max-w-4xl">
                    <div className="overflow-hidden w-full max-w-md md:hover:scale-105 md:active:scale-150 md:active:z-50 rounded-2xl relative shadow-2xl mb-5 gtransition">
                        <img src={item.image_url} className="object-fill h-full w-full"></img>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                        {item.title}
                    </h1>
                    <Divider /> 
                </div>
              </div>
              <div className="text-start px-5 mb-5">
              <div className="w-full select-text prose prose-invert prose-img:rounded-2xl prose-a:text-red-300 prose-a:underline-offset-2 prose-pre:bg-zone/20 prose-pre:text-white max-width-reset max-w-4xl z-10">
              <p dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(item.content) }}></p>
</div>

              </div>
                  </main></div>
          ))}
      </div>
      );
    }