"use client";
import {
  createClientComponentClient
} from "@supabase/auth-helpers-nextjs";
import { ArrowRight, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { Button, Input, Link, Pagination } from "@nextui-org/react";
import {Progress} from "@nextui-org/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import TestCard from "@/components/test-card";



export default function Home() {
  const [showAlert, setShowAlert] = useState(false); 

  const [search, setSearch] = useState('');

  const [data, setData] = useState<any[] | null>(null);
  const [Userdata, setUserData] = useState<any[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [posts, setPosts] = useState<any[] | null>(null); 
  const supabase = createClientComponentClient();

  async function fetchData() {
      const { data: fetchedData, error } = await supabase
        .from("models")
        .select("*")
        .order('created_at', { ascending: true })

      if (error) {
        setError(error);
      } else {
        setData(fetchedData);
        setPosts(fetchedData); 
      }
    }
    
useEffect(() => { 
    fetchData();
  }, []); 

  function copyToClipboard(link: string) {
    const textarea = document.createElement("textarea");
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  
    setShowAlert(true);
  
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
  const alertClass = showAlert ? "fade-in" : "fade-out";

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
      <Progress
        isIndeterminate
        aria-label="Loading..."
        className="max-w-xs md:max-w-md "
        color="success"
        size="sm"
      />
      </div>
    );
  }

  return (
    
    
    <section>
      <div className="fixed rounded-2xl w-11/12 sm:w-[581px] h-40 sm:h-[80px] p-0.5 z-10 bottom-10 left-0 right-0 mx-auto">
        <div className="rounded-[14px] w-full h-full bg-background border-2 border-zinc-600   flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
        <p className="dark:text-white text-[13px] w-[304px] h-10 flex items-center justify-center p-3 text-black">Enjoy +8000 voice models available in our database!
        </p>
        <a className="dark:text-black text-white text-[13px] dark:bg-white bg-[#090909] hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center " href="https://applio.org/bot" target="_blank" rel="noreferrer">Get Applio Bot <div className="ml-2"><ArrowRight size={20} strokeWidth={1.5} /></div></a>
        </div>
        </div>
      <div className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
        <h1 className="text-8xl font-bold leading-tight tracking-tighter md:text-9xl mt-4 ">
          Models
        </h1>
        <p className="mt-4 text-muted-foreground  text-xs md:text-xl">
          Enjoy +8000 voice models available in our database!
        </p>
        {/* <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl mt-52 ">
        Under <span className="bg-gradient-radial-red text-transparent bg-clip-text">maintenance</span>.
        </h1> */}
      </div>
      <form className="mx-auto flex items-center justify-center">
        <Input
          classNames={{
            base: "max-w-[18rem] sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search a model..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />
</form>
      <section className="grid grid-cols-1 md:grid-cols-5 max-w-8xl gap-5 py-8 md:py-10 mx-16 items-center justify-center">
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
            id,
            epochs,
            version,
            type,
            algorithm,
            author_id
          } = post

          const modelSlug = link

          return (
        <div className="w-full button-cursor" key={modelSlug + index}>  
      <TestCard
          name={name}
          imageUrl={imageUrl}
          created_at={created_at}
          id={id}
          link={link}
          epochs={epochs}
          version={version}
          type={type}
          algorithm={algorithm}
          author_id={author_id}
          />
       </div>     
          )
        })}

      </section>
      {/* Alert */}
    
      {showAlert && (
        <div
          className={`fixed rounded-2xl w-11/12 sm:w-[420px] h-40 sm:h-[60px] p-0.5 z-10 bottom-10 right-0 mx-auto text-center mr-4 ${alertClass} mb-16 md:mb-0`}
        >
      <div
      className="font-regular relative block w-full max-w-screen-md rounded-lg bg-background border border-zinc-600 px-4 py-4 text-base text-white"
      data-dismissible="alert"
        >
          <div className="absolute top-4 left-4 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="mt-px h-6 w-6"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-8 mr-12">
            <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">
            Copied to clipboard
            </h5>
          </div>
          <div
            data-dismissible-target="alert"
            data-ripple-dark="true"
            className="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
          >
            <div role="button" className="w-max rounded-lg p-1 text-red-500" onClick={() => setShowAlert(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        </div>
        )} 
    </section>
  )
}
