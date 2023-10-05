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
import toast, { Toaster } from 'react-hot-toast';


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
    const [showAlert, setShowAlert] = useState(false); 
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
  const [isLoading, setIsLoading] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };
  const handleImageError = () => {
    setImageError(true);
    setLoading(false);
  };

  const alertClass = showAlert ? "fade-in" : "fade-out";
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
        {name !== '' ? name : 'Unknown name'}
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
    <DialogTitle className="text-xl md:text-6xl mt-4 mb-4">
  {name !== '' ? name : 'Unknown name'}
    </DialogTitle>
    <DialogTitle className="text-sm md:text-2xl text-neutral-300 bg-neutral-800/30 rounded-lg md:rounded-xl backdrop-blur-lg w-full md:w-fit p-3">
      {user?.full_name !== 'null' ? `Created by ${user?.full_name}` : 'Unknown owner'}
    </DialogTitle>

    <div className="grid md:grid-cols-1 gap-2 md:max-w-fit"> 
  <div className="bg-neutral-800/30 w-auto h-auto rounded-lg md:rounded-xl backdrop-blur-lg p-3">
    <DialogTitle className="text-sm md:text-xl text-neutral-300">
      {type !== '' ? type : 'Unknown type.'}
    </DialogTitle>
  </div>
  <div className="bg-neutral-800/30 w-auto h-auto rounded-lg md:rounded-xl backdrop-blur-lg p-3">
  <DialogTitle className="text-sm md:text-xl text-neutral-300">
    {epochs !== '' ? `${epochs} Epochs` : 'Unknown epochs.'}
    </DialogTitle>
  </div>
  <div className="bg-neutral-800/30 w-auto h-auto rounded-lg md:rounded-xl backdrop-blur-lg p-3">
  <DialogTitle className="text-sm md:text-xl text-neutral-300">
    {algorithm !== '' ? algorithm : 'Unknown algorithm.'}
    </DialogTitle>
  </div>
  <div className="bg-neutral-800/30 hidden md:block">
  <Link href={link} className="place-content-center sm:place-content-center my-2 z-50 " isExternal target="_blank" 
          style={{
            position: "absolute",
            bottom: "10px",
            right: "20px",
          }}>
        <Button
          color="primary"
          radius="md"
          size="lg"
        >
          Download
        </Button>
        </Link>
  </div>
  <div className="bg-neutral-800/30 hidden md:block">
  <Tooltip placement="left" color="foreground" showArrow content="¡You must open Applio for this to work!">
    {link.endsWith('.zip') && ( 
      <Link className="place-content-center sm:place-content-center my-2 z-50" isExternal target="_blank" 
        style={{
          position: "absolute",
          bottom: "10px",
          right: "150px",
        }}>
        <Button
          color="success"
          radius="md"
          size="lg"
          variant="shadow"
          isIconOnly
          startContent={isLoading ? null : <img src="https://i.imgur.com/UYCcsNM.png" className="w-10 h-10"></img>}
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={async () => {
              toast('Be patient, this process can take time.', {
              duration: 4000,
              position: 'bottom-left',

              style: {
                color: 'white',
                backgroundColor: '#262626'
              }
            });
            setTimeout(() => {
            setIsLoading(true);
            }, 4000);

            try {
              const response = await fetch('http://localhost:8000/download/' + link);

              if (!response.ok) {
                throw new Error('La solicitud no pudo completarse correctamente');
              }

              toast.success('${name} has been downloaded!', {
                duration: 4000,
                position: 'bottom-left',
  
                style: {
                  color: 'white',
                  backgroundColor: '#262626'
                }
              });
              setTimeout(() => {
                setIsLoading(false);
              }, 4000);
  
            } catch (error) {
              console.error('Error en la solicitud:', error);
  
              setIsLoading(false);
            }
          }}
        >
        <Toaster />
        </Button>
      </Link>
    )}
  </Tooltip>
</div>
</div>



      <DialogDescription>
    </DialogDescription>
      <DialogDescription className="">
      <div className="flex items-center justify-center md:ml-32">
      <div className="relative md:h-4/6 md:w-6/12 h-44 w-[220px] rounded-xl bg-background  md:z-50 md:flex overflow-hidden md:fixed ">
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