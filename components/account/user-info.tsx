"use client";
import { Database } from "@/app/types/database";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
  Spacer,
  Spinner,
  User,
} from "@nextui-org/react";
import TestCard from "../navbar/models/test-card";

const supabase = createClientComponentClient<Database>();

interface ModelInfoProps {
  userFullName: string;
}

function Userinfo({ userFullName }: ModelInfoProps) {
  const [showAlert, setShowAlert] = useState(false); 
  const [data, setData] = useState<any[] | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  const handleDownloadClick = () => {
    if (data) {
      const modelUrl = data[0]?.model_url;

      if (modelUrl) {
        window.open(modelUrl, "_blank");
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      // Fetch user data based on full name
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("full_name, id, role")
        .eq("full_name", userFullName);

      if (userError) {
        setError(userError);
        return;
      }


      setUser(userData[0]);

      // Fetch models associated with the user's ID
      const { data: modelsData, error: modelsError } = await supabase
        .from("models")
        .select("*")
        .eq("author_id", userData[0]?.id);

        if (modelsError) {
          console.error("Error al consultar modelos:", modelsError);
          setError(modelsError);
          return;
        }

      setData(modelsData);

    }

    fetchData();
  }, [userFullName]);

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <h1>
          The user does not exist or has not uploaded any model
        </h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-5 py-8 md:py-10 mx-14">
      {data.map((model) => (
        <div className="w-full button-cursor"  key={model.id}>
           <TestCard
          name={model.name}
          imageUrl={model.image_url}
          created_at={model.created_at}
          id={model.id}
          userFullName={user.full_name}
          link={model.link}
          type={model.type}
          version={model.version}
          epochs={model.epochs}
          author_id={model.author_id}
          algorithm={model.algorithm}
          likes={model.likes}
          />
         </div>
      ))}
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
    </div>
  );
}

export default Userinfo;