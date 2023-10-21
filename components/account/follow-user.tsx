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
        .eq("id", userData[0]?.id);

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
    return <div className="flex items-center justify-center m-8"></div>;
  }

  return (
    <div>
<div className="flex justify-center items-center mx-auto my-8">
  <div className="rounded-2xl md:mt-10 px-4 backdrop-blur-xl flex items-center"> 
    <h1 style={{ overflow: 'visible' }} className={`text-center text-6xl truncate font-bold text-disable-antialiasing leading-tight tracking-tighter md:text-8xl pr-4 ${user && user.role === "admin" ? 'animate-charcter pb-2' : ''}`}>{user && user.full_name}</h1>
    {user && user.role === "admin" && (
      <Tooltip content="This user is part of the Applio team" showArrow placement="right">
        <Image
          width={60}
          height={60}
          src="https://i.imgur.com/jDmINMQ.png"
          alt="Admin"
          className="mt-2 hidden md:block md:hover:scale-110 gtransition"
        />
      </Tooltip>
    )}
  </div>
</div>
      <div className="flex justify-center items-center max-w-full mx-6 my-2">
      <Card className="max-w-[1200px]">
      <CardBody>
      {user && user.bio != "null" && (
      <p>{user?.bio}</p>
      )}
      </CardBody>
    </Card>
      </div>
      <div className="mt-10">
      <Divider />
      </div>
    </div>
  );
}
export default Follow;