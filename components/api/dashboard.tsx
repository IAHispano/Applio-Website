"use client";
import React from "react";
import {Breadcrumbs, BreadcrumbItem, Progress, Divider} from "@nextui-org/react";
import { Database } from "@/app/types/database";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import '@/styles/text-animation.css'
import { Home, KeySquare } from "lucide-react";

const supabase = createClientComponentClient<Database>();


interface ModelInfoProps {
  auth_id: string;
  current_page: string;
}

function ApiDashboard({ auth_id, current_page }: ModelInfoProps) {
  const [data, setData] = useState<any[] | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data based on auth_id
        const { data: userData, error: userError } = await supabase
          .from("profiles")
          .select("*")
          .eq("auth_id", auth_id);
  
        if (userError) {
          setError(userError);
          return;
        }
  
        if (userData.length === 0) {
          setError({ details: "", hint: "", code: "", message: "This user does not exist" });
          return;
        }
  
        setUser(userData[0]); // Update user state with the fetched data
      } catch (error) {
        setError(error as PostgrestError);
      }
    }
  
    fetchData();
  }, [auth_id]);
  
  if (error) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl mt-52">
          This user does <span className="bg-gradient-radial-red text-transparent bg-clip-text">not exist</span>.
        </h1>
      </div>
    );
  }

  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Progress
          isIndeterminate
          aria-label="Loading..."
          className="max-w-xs md:max-w-md"
          color="success"
          size="sm"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full flex flex-col gap-5 md:gap-10 justify-center items-center text-left">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight w-full whitespace-nowrap">Hey, {user.full_name}!</h1>
      <div className="w-full">
      <Breadcrumbs size="lg"
      classNames={{
        list: "gap-2",
      }}
      itemClasses={{
        item: [
          "px-2 py-0.5 border-small border-default-400 rounded-small",
          "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
          "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
        ],
        separator: "hidden",
      }}>
      <BreadcrumbItem key="home"  isCurrent={current_page === "home"} href="/api/app">
        Home
      </BreadcrumbItem>
      <BreadcrumbItem key="keys" isCurrent={current_page === "keys"} href="/api/app/keys">
        Keys
      </BreadcrumbItem>
      <BreadcrumbItem key="docs" isCurrent={current_page === "docs"} href="/api/app/docs">
        Docs
      </BreadcrumbItem>
    </Breadcrumbs>
    <Divider  className="mt-4 mb-2"/>
    </div>
    </div>

  );
}
export default ApiDashboard;