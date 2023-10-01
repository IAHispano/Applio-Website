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
import ModelCard from "./model-card";

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
        .eq("id", userData[0]?.id);

        if (modelsError) {
          console.error("Error al consultar modelos:", modelsError);
          setError(modelsError);
          return;
        }

      setData(modelsData);
      console.log(modelsData);
      console.log("User ID:", userData[0]?.id);

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
        // <Link key={model.id} href={`/${model.id}`}>
        <div className="w-full button-cursor" key={model.modelSlug + model.index} onClick={() => copyToClipboard(model.link)}>
           <ModelCard
          name={model.name}
          imageUrl={model.image_url}
          created_at={model.created_at}
          />
         </div>
        // </Link>
      ))}
    </div>
  );
}

export default Userinfo;