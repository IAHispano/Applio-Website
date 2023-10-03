import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Divider, Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link, Checkbox, Tooltip } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { PostgrestError } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/types/database";
import { Apple } from "lucide-react";


export default function TestCard({
  imageUrl,
  name,
  created_at,
  id,
  userFullName,
  link,
  epochs,
  version,
  type,
  algorithm,
  author_id
}: {
  imageUrl: string;
  name: string;
  created_at: string;
  id: string;
  userFullName?: string;
  link: string;
  epochs: string;
  version: string;
  type: string;
  algorithm: string;
  author_id: string;
}) {
  
    const supabase = createClientComponentClient<Database>(); 
    const [data, setData] = useState<any[] | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [error, setError] = useState<PostgrestError | null>(null);
    useEffect(() => {
      async function fetchData() {
        // Fetch user data based on full name
        const { data: userData, error: userError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", author_id);
    
        if (userError) {
          setError(userError);
          return;
        }
        setUser(userData[0] || { full_name: "unknown user" });
      }
    
      fetchData();
    }, [userFullName]);

  function formatDate(timestamp: string | number | Date) {
    // Convierte el timestamp a una instancia de Date
    const date = new Date(Number(timestamp));

    // Obtiene el año, mes y día de la fecha
    const year = date.getFullYear();
    // Agrega 1 al mes porque los meses en JavaScript se indexan desde 0
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Formatea la fecha como "mes/día/año"
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
}
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };
  const handleImageError = () => {
    setImageError(true);
    setLoading(false);
  };

  const isAudioOrError = imageUrl && imageUrl.toLowerCase().endsWith(".mp3") || imageError;
  const formattedDate = formatDate(created_at);
  const cardStyle = {
    height: '150px',
    overflow: 'hidden', 
  };
  return (
    <div>
<Dialog>
  <DialogTrigger style={{ width: '100%' }}> 
  <Card style={{ flex: 1, height: '150px', overflow: 'hidden' }} className="mx-auto flex items-center justify-center">
      <CardBody>
        <p className="text-xl">
        {name !== 'null' ? name : 'Unknown name'}
        </p>
      </CardBody>
      
      <CardFooter style={{ fontSize: 'smaller' }} className="mx-auto flex items-center justify-center">
<Chip className="mx-1 text-black dark:text-neutral-200" radius="sm" variant="dot" color="success" size="sm">
  {userFullName}
  {userFullName ? " on " : ''}
  {formattedDate !== 'NaN/NaN/NaN' ? formattedDate : 'unknown date'}
</Chip>
      </CardFooter>
    </Card>
  </DialogTrigger>
  <DialogContent className="max-w-9xl w-6/12 md:h-3/6  rounded-3xl undefined bg-background" style={{ width: '70%', height: '75%' }}>
    <DialogHeader>
    <DialogTitle className="text-xl md:text-6xl mt-4 mb-2">
  {name !== 'null' ? name : 'Unknown name'}
    </DialogTitle>
    <DialogTitle className="text-sm md:text-2xl text-neutral-500 ml-0.5">
      Created by {user?.full_name}.
    </DialogTitle>

    <div className="grid md:grid-cols-1 gap-2 md:max-w-fit"> 
  <div className="bg-neutral-800 w-auto h-fit rounded-lg md:rounded-xl backdrop-blur-lg mt-28 p-4">
    <DialogTitle className="text-sm md:text-xl text-white dark:text-neutral-300">
      {type !== 'null' ? type : 'Unknown type.'}
    </DialogTitle>
  </div>
  <div className="bg-neutral-800 w-auto h-auto rounded-lg md:rounded-xl backdrop-blur-lg p-4">
  <DialogTitle className="text-sm md:text-xl text-white dark:text-neutral-300">
    {epochs !== 'null' ? `${epochs} Epochs` : 'Unknown epochs.'}
    </DialogTitle>
  </div>
  <div className="bg-neutral-800 w-auto h-auto rounded-lg md:rounded-xl backdrop-blur-lg p-4">
  <DialogTitle className="text-sm md:text-xl text-white dark:text-neutral-300">
    {algorithm !== 'null' ? algorithm : 'Unknown algorithm.'}
    </DialogTitle>
  </div>
  <div className="bg-neutral-800/30 hidden md:block">
  <Link href={link} className="place-content-center sm:place-content-center my-5 z-50" isExternal target="_blank" 
          style={{
            position: "absolute",
            bottom: "10px",
            right: "80px",
          }}>
        <Button
          color="primary"
          radius="md"
          size="lg"
          variant="shadow"
        >
          Download
        </Button>
        </Link>
  </div>
  <div className="bg-neutral-800/30 hidden md:block">
  <Tooltip placement="left" color="foreground" showArrow content="¡You must open Applio for this to work!" isDisabled>
  <Link href={`http://localhost:8000/${link}`} className="place-content-center sm:place-content-center my-5 z-50" isExternal target="_blank" isDisabled 
          style={{
            position: "absolute",
            bottom: "10px",
            right: "220px",
          }}>
        <Button
          color="success"
          radius="md"
          size="lg"
          variant="shadow"
          isIconOnly
          isDisabled
          startContent={<img src="https://i.imgur.com/UYCcsNM.png" className="w-10 h-10"></img>}
        >
        </Button>
        </Link>
      </Tooltip>
  </div>
</div>

      <DialogDescription className="">
      <div className="flex items-center justify-center mx-auto">
      <div className="relative md:h-4/6 md:w-8/12 h-44 w-[220px] rounded-xl bg-background md:mb-48 ml-72 md:flex overflow-hidden md:fixed ">
        {isAudioOrError ? (
          <Image
          src="https://i.imgur.com/QLOUYSr.png"
          alt="Image Error"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 1)",
            borderRadius: "8px",
          }}
          loading="eager"
          onLoadingComplete={handleImageLoad}
          onError={handleImageError} 
          unoptimized
        />

        ) : (
          <Image
            src={imageUrl}
            alt="Picture of the model"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 1)",
              borderRadius: "8px",
            }}
            loading="eager"
            onLoadingComplete={handleImageLoad}
            onError={handleImageError} 
            unoptimized
          />
        )}
          </div>
          </div>
          <div className="block md:hidden mt-6 mx-auto">
  <Link href={link} className="place-content-center" isExternal target="_blank">
        <Button
          color="primary"
          radius="md"
          variant="shadow"
        >
          Download
        </Button>
        </Link>
  </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
  
  );
}