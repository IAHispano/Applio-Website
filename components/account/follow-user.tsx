"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Spinner,
  Divider,
  Image,
  Tooltip,
  User,
  Link,
  Progress,
} from "@nextui-org/react";
import { Database } from "@/app/types/database";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import '@/styles/text-animation.css'

const supabase = createClientComponentClient<Database>();


interface ModelInfoProps {
  userFullName: string;
}

function Follow({ userFullName }: ModelInfoProps) {
  const [data, setData] = useState<any[] | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch user data based on full name
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("full_name", userFullName);

      if (userError) {
        setError(userError);
        return;
      }

      if (userData.length === 0) {
        // User does not exist in the "profiles" table
        setError({ details: "", hint: "", code: "", message: "This user does not exist" });
        return;
      }

      setUser(userData[0]);

      // Fetch models associated with the user's ID
      const { data: modelsData, error: modelsError } = await supabase
        .from("models")
        .select("*")
        .eq("author_id", userData[0]?.id);

      if (modelsError) {
        setError(modelsError);
        return;
      }

      setData(modelsData);
    }

    fetchData();
  }, [userFullName]);

  if (error) {
    return <div className="flex items-center justify-center">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl mt-52 ">
        This user does <span className="bg-gradient-radial-red text-transparent bg-clip-text">not exist</span>.
        </h1>
    </div>;
  }

  if (!data) {
    return       <div className="flex items-center justify-center h-screen">
    <Progress
      isIndeterminate
      aria-label="Loading..."
      className="max-w-xs md:max-w-md "
      // HALLOWEEN
      color="warning"
      // color="success"
      size="sm"
    />
    </div>;
  }

  return (
    <div>
<div className="flex justify-center items-center mx-auto md:my-8">
  <div className="rounded-2xl md:mt-10 px-4 backdrop-blur-xl flex items-center"> 
    <h1 style={{ overflow: 'visible' }} className={`text-center text-7xl truncate font-bold text-disable-antialiasing leading-tight tracking-tighter md:text-8xl px-2 md:pr-4 ${user && user.role === "admin" ? 'animate-charcter pb-2' : ''}`}>{user && user.full_name}</h1>
    {user && user.role === "admin" && (
      <Tooltip content="This user is part of the Applio team" showArrow placement="right">
        <Image
          width={60}
          height={60}
          // HALLOWEEN  
          src="https://images-ext-2.discordapp.net/external/a0_2PZvUnvIdwGnNLiQ0eX82zfzJzPghEaplu1aw-Xw/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1151157990477533326/56ec580ddbd3bf15010719d188761592.webp?width=671&height=671"       
          // NORMAL src="https://i.imgur.com/jDmINMQ.png"
          alt="Admin"
          className="mt-2 hidden md:block md:hover:scale-110 gtransition"
        />
      </Tooltip>
    )}
  </div>
</div>
      <div className="flex justify-center items-center max-w-full mx-6 my-2">
      <Card className="max-w-[1120px] w-full">
      <CardBody className="flex justify-center items-center break-words">
      {user && user.bio != "null" && (
      <p>{user?.bio}</p>
      )}
      </CardBody>
    </Card>
      </div>
      <div className="flex justify-center items-center mx-auto my-4 max-w-[1120px] overflow-hidden">
      <section className="w-full max-md:w-72 flex gap-4 gtransition">
      <article className="w-1/2 p-5 gap-4 dark:shadow-2xl flex flex-col rounded-2xl undefined dark:bg-[#18181b] dark:border-0 border-2 dark:text-white justify-start items-start relative">
        <section className="w-full flex flex-col gap-4 rounded-lg overflow-y-auto">
        <div className="h-full flex flex-col items-start justify-center text-left">
        {data.length === 0 && (
            <h2 className="font-medium text-inherit tracking-tight text-2xl max-md:text-xl w-full flex items-center justify-center gap-4 p-2">
              It does not have any badge
            </h2>
          )}
          <h2 className="font-medium tracking-tight text-2xl max-md:text-xl w-full flex items-center justify-center gap-4 p-1.5 max-md:grid">
            {data.length >= 269 ? (
              <>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">5</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/role-icons/1142911409202675752/b358c5fddf8cb639e28d58e1f0277b1e.webp?size=40&quality=lossless" color="danger"/>
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">15</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/role-icons/1150888519972167761/21b9ce319177c09da33ea4114cc60e7f.webp?quality=lossless" color="success" />
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">30</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://simpleicon.com/wp-content/uploads/music-note-1.png" color="primary" className="bg-white" />
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">50</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/emojis/1141551292498583662?size=512" color="warning" />
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">269</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://images-ext-2.discordapp.net/external/Vnpre0FtmVJVwSGVGwb6kC3DoxEbRBSJJZiF0u3PYXk/%3Fsize%3D512/https/cdn.discordapp.com/emojis/1163273845793378474" color="danger" />
              </Tooltip>
                      </>
              ) : data.length >= 50 ? (
              <>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">5</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/role-icons/1142911409202675752/b358c5fddf8cb639e28d58e1f0277b1e.webp?size=40&quality=lossless" color="danger"/>
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">15</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/role-icons/1150888519972167761/21b9ce319177c09da33ea4114cc60e7f.webp?quality=lossless" color="success"/>
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">30</span> models have been uploaded.</span>} placement="bottom" color="foreground">
              <Avatar isBordered radius="sm" src="https://simpleicon.com/wp-content/uploads/music-note-1.png" color="primary" className="bg-white"/>
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">50</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/emojis/1141551292498583662?size=512" color="warning" />
              </Tooltip>
              </>
            ) : data.length >= 30 ? (
              <>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">5</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/role-icons/1142911409202675752/b358c5fddf8cb639e28d58e1f0277b1e.webp?size=40&quality=lossless" color="danger"/>
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">15</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/role-icons/1150888519972167761/21b9ce319177c09da33ea4114cc60e7f.webp?quality=lossless" color="success"/>
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">30</span> models have been uploaded.</span>} placement="bottom" color="foreground">
              <Avatar isBordered radius="sm" src="https://simpleicon.com/wp-content/uploads/music-note-1.png" color="primary" className="bg-white"/>
              </Tooltip>
              </>
            ) : data.length >= 15 ? (
              <>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">5</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/role-icons/1142911409202675752/b358c5fddf8cb639e28d58e1f0277b1e.webp?size=40&quality=lossless" color="danger"/>
              </Tooltip>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">15</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/role-icons/1150888519972167761/21b9ce319177c09da33ea4114cc60e7f.webp?quality=lossless" color="success"/>
              </Tooltip>
               </>
            ) : data.length >= 5 ? (
              <>
              <Tooltip showArrow content={<span>This badge is obtained after <span className="underline decoration-2 italic underline-offset-2 decoration-green-500 select-all md:hover:tracking-wide gtransition-low">5</span> models have been uploaded.</span>} placement="bottom" color="foreground">
                <Avatar isBordered radius="sm" src="https://cdn.discordapp.com/role-icons/1142911409202675752/b358c5fddf8cb639e28d58e1f0277b1e.webp?size=40&quality=lossless" color="danger"/>
              </Tooltip>
              </>
            ) : null
        }
        </h2>
      </div>
        </section>
      </article>
      <article className="w-1/2 p-5 gap-4 dark:shadow-2xl flex flex-col rounded-2xl undefined dark:bg-[#18181b] dark:border-0 border-2 dark:text-white justify-start items-start relative">
        <section className="w-full flex flex-col gap-4 rounded-lg overflow-y-auto">
        {data.length === 0 ? (
            <h2 className="font-medium text-inherit tracking-tight text-2xl max-md:text-xl w-full flex items-center justify-center gap-4 p-2">
            No model has been uploaded
            </h2>
            ) : (
          <div className="h-full flex flex-col items-start justify-start text-left">
            <p className="text-sm uppercase md:tracking-widest w-full font-bold">Models uploaded:</p>
            <h2 className="font-medium tracking-tight text-2xl max-md:text-xl w-full">{data.length}</h2>
          </div>
           )}
        </section>
      </article>
    </section>
    </div>
      <div className="mt-10">
      <Divider 
      // HALLOWEEN
      className="bg-[#974200]"
      />
      </div>
    </div>
  );
}
export default Follow;