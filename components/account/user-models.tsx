"use client";
import {
  createClientComponentClient
} from "@supabase/auth-helpers-nextjs";
import { ArrowRight, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { Button, Input, Link, Pagination, Spinner } from "@nextui-org/react";
import {Progress} from "@nextui-org/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import TestCard from "@/components/models/test-card";

interface ModelInfoProps {
  userFullName: string;
}

function Usermodels({ userFullName }: ModelInfoProps) {
  const [showAlert, setShowAlert] = useState(false); 

  const [search, setSearch] = useState('');

  const [data, setData] = useState<any[] | null>(null);
  const [Userdata, setUserData] = useState<any[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [posts, setPosts] = useState<any[] | null>(null); 
  const supabase = createClientComponentClient();
  const [end, setEnd] = useState(30);
  const [user, setUser] = useState<any | null>(null);

  async function fetchData() {
      const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("full_name, id, role")
      .eq("full_name", userFullName);

        if (userError) {
          setError(userError);
          return;
        }
  
  
        setUser(userData[0]);
      if (userData && userData.length > 0) {
      const { data: fetchedData, error } = await supabase
        .from("models")
        .select("*")
        .order('likes', { ascending: false })
        .range(0, end)
        .eq('author_id', userData[0].id)

      if (error) {
        setError(error);
      } else {
        setData(fetchedData);
        setPosts(fetchedData); 
      }
    }
  }
    
useEffect(() => { 
    fetchData();
  }, [end]);
  
  function loadmore() {
    setEnd(end + 10); 
  }

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

  return (
    
    
    <section className="my-10">
      <InfiniteScroll
      dataLength={data?.length || 0}
      hasMore={true}
      next={loadmore}
      loader={
      <div className="flex items-center justify-center">
      <Spinner 
      color="success"/>
      </div>
    }
      endMessage={
        <div className="flex items-center justify-center">
          <b>You have reached the end.</b>
        </div>
      }
      >
      {user && (
        <div className="md:py-2 mx-14">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Models created by <span className="underline decoration-[4px] italic underline-offset-4  select-all md:hover:tracking-wide gtransition-low
          decoration-green-500 ">
            {user.full_name}
          </span> :</h1>
          <p className="text-xs md:text-sm tracking-tight dark:text-neutral-300 text-left pt-1">(From most popular to least popular)</p>
        </div>
      )}
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
            author_id,
            likes
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
          likes={likes}
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
      </InfiniteScroll>
    </section>
  )
}
export default Usermodels;