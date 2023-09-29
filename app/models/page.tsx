"use client";
import {
  createClientComponentClient
} from "@supabase/auth-helpers-nextjs";
import ModelCard from "@/components/model-card";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";

export default function Home() {
  const [search, setSearch] = useState('');
  console.log(search);

  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [posts, setPosts] = useState<any[] | null>(null); 
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchData() {
      const { data: fetchedData, error } = await supabase
        .from("models")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        setError(error);
      } else {
        setData(fetchedData);
        setPosts(fetchedData); 
      }
    }

    fetchData();
  }, []); 

  function copyToClipboard(link: string) {
    const textarea = document.createElement("textarea");
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen md:ml-0 ml-6">
        <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    
    
    <section>
      <div className="fixed rounded-2xl w-11/12 sm:w-[581px] h-40 sm:h-[80px] p-0.5 z-10 bottom-10 left-0 right-0 mx-auto">
        <div className="rounded-[14px] w-full h-full bg-background border-2 border-zinc-600   flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
        <p className="text-white text-[13px] w-[304px] h-10 flex items-center justify-center p-3">Enjoy +8000 voice models available in our database!
        </p>
        <a className="text-black text-[13px] bg-white hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center " href="https://applio.org/bot" target="_blank" rel="noreferrer">Get Applio Bot <div className="ml-2"><ArrowRight size={20} strokeWidth={1.5} /></div></a>
        </div>
        </div>
      <div className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
        <h1 className="text-8xl font-bold leading-tight tracking-tighter md:text-9xl mt-4 ">
          Models
        </h1>
        <p className="mt-4 text-muted-foreground  text-xs md:text-xl">
          Enjoy +8000 voice models available in our database!
        </p>
      </div>
      <form className="mx-auto flex items-center justify-center">
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" onChange={(e) => setSearch(e.target.value)} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Models" required />
    </div>
</form>
      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-5 py-8 md:py-10 mx-14">
        {posts?.filter((item) => {
          const itemName = item && item.name ? item.name.toLowerCase() : '';
          const searchLower = search.toLowerCase();
          return searchLower === '' ? true : itemName.includes(searchLower);
        }).map((post: any, index: number) => {
          const {
            name,
            image_url: imageUrl,
            created_at,
            link,
          } = post

          const modelSlug = link

          return (
      <Dialog key={modelSlug + index}>
      <DialogTrigger onClick={() => copyToClipboard(link)}>
         <div className="w-full button-cursor">
           <ModelCard
          name={name}
          imageUrl={imageUrl}
          created_at={created_at}
          />
         </div>
       </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] sm:max-h-[200px] max-w-[300px]">
          <DialogHeader>
            <DialogTitle>Ready 🎉</DialogTitle>
            <DialogDescription>
            Now you have the link to your model copied to the clipboard. 
            Isn&apos;t it incredibly simple?
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
          )
        })}
      </section>
    </section>
  )
}
