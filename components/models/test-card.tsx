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
import { useToast } from "@/components/ui/use-toast"
import { Bot, Box, Copy, Heart, Share, Star, ThumbsUp } from "lucide-react";
import { useClipboard } from "@mantine/hooks";
import { addPost } from "@/app/actions/like-model-action";
import { Toaster } from "../ui/toaster";



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
  author_id,
  likes
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
  likes: string;
}) {
  imageUrl = imageUrl ?? 'N/A';
    
    const supabase = createClientComponentClient<Database>(); 
    const [data, setData] = useState<any[] | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [error, setError] = useState<PostgrestError | null>(null);
    const [showAlert, setShowAlert] = useState(false); 
    const [buttonClicked, setClicked] = useState(false);
    const { toast } = useToast()

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
        setUser(userData[0] || { full_name: "Unknown user" });
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
  const clipboard = useClipboard({ timeout: 500 });
  
  function redirect(destination: string) {
    window.location.href = destination;
  }

  const handleDeletePost = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session === null) {
      redirect('/login');
    } else {

    if (userLiked) {
      return; 
    }
  
    const likedItems = JSON.parse(localStorage.getItem("likedItems") || "[]");
    likedItems.push(id);
    localStorage.setItem("likedItems", JSON.stringify(likedItems));

    const formData = new FormData();
    formData.append("id", id);
  
    await addPost(formData);
    
    setUserLiked(true);
  }
  };
  const [userLiked, setUserLiked] = useState(false);

  return (
    <div >
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
      {type || "Unknown"}
      </Chip>
      </CardFooter>
    </Card>
  </DialogTrigger>
  <DialogContent className="max-w-9xl w-6/12 md:h-3/6  rounded-3xl undefined bg-background" style={{ width: '70%', height: '75%' }}>
    <DialogHeader>
    <DialogTitle className="text-xl md:text-6xl mt-4 z-30 text-white bg-black/80 h-fit w-fit p-4 rounded">
  {name !== '' ? name : 'Unknown name'}
    </DialogTitle>
    <DialogTitle className="font-semibold text-sm md:text-xl text-white z-30 bg-black/80 h-fit w-fit p-2 rounded">
    {user?.full_name !== 'Unknown user' && user?.full_name !== 'null' && user?.full_name !== '' ? (
      <a className="button-cursor" href={`/user/${user?.full_name}`}>
       Created by {user?.full_name}
      </a>
    ) : (
      'Unknown owner'
    )} 
    </DialogTitle>
    <DialogTitle className="font-semibold text-sm md:text-lg text-white z-30 bg-black/80 h-fit w-fit p-2 rounded">
      {likes !== 'null' ? `${likes} likes ` : 'Unknown likes'}
    </DialogTitle>
  <div className="bg-neutral-800/30 hidden md:block">
  <Link href={link} className="place-content-center sm:place-content-center z-50 bg-black/80 h-fit w-fit rounded-xl md:hover:bg-green-500/50 gtransition md:hover:mb-1" isExternal target="_blank" 
          style={{
            position: "absolute",
            bottom: "10px",
            right: "20px",
          }}>
        <Button
          radius="md"
          size="lg"
          variant="bordered"
        >
          <p className="text-white z-30">Download</p>
        </Button>
        </Link>
  </div>
  <div className="bg-neutral-800/30 hidden md:block">
  <div className="place-content-center sm:place-content-center z-50 bg-black/80 h-fit w-fit rounded-xl md:hover:bg-green-500/50 gtransition md:hover:mb-1" 
          style={{
            position: "absolute",
            bottom: "10px",
            right: "215px",
          }}
          >
<Button
  radius="md"
  size="lg"
  variant="bordered"
  isIconOnly
  color="default"
  className="z-50"
  onClick={() => {
    clipboard.copy(`https://applio.org/models/download/${id}`);
    toast({
      title: "Link copied to clipboard",
      description: `Now you can share the ${name} model with your friends!`,
    })

  }}
  >
  <Share className="text-white"/>
</Button>
        </div>
  </div>
  <div className="bg-neutral-800/30 hidden md:block">
  <div className="place-content-center sm:place-content-center z-50 bg-black/80 h-fit w-fit rounded-xl md:hover:bg-green-500/50 gtransition md:hover:mb-1"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "155px",
          }}
          >
<Button
  radius="md"
  size="lg"
  variant="bordered"
  isDisabled={userLiked}
  isIconOnly
  color={userLiked ? 'success' : 'default'}
  onClick={handleDeletePost}
>
  <ThumbsUp className="text-white"/>
</Button>
        </div>
  </div>
  <div className="bg-neutral-800/30 hidden md:block">
  <Tooltip placement="left" color="foreground" showArrow content="You must open Applio for this to work!">
    {link.endsWith('.zip') && ( 
      <Link className="place-content-center sm:place-content-center z-50" isExternal target="_blank" 
        style={{
          position: "absolute",
          bottom: "10px",
          right: "275px",
        }}>
        <Button
          color="success"
          radius="md"
          size="lg"
          variant="shadow"
          isIconOnly
          startContent={isLoading ? null : <img src="https://i.imgur.com/UYCcsNM.png" className="w-10 h-10 md:hover:scale-150 gtransition"></img>}
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={async () => {
            toast({
              title: "Be patient, this process can take time.",
              description: "You can check the CMD to see how the download is going."
            })
            setTimeout(() => {
            setIsLoading(true);
            }, 4000);

            try {
              const response = await fetch('http://localhost:8000/download/' + link);
              toast({
                title: '${name} has been downloaded!',
              })

              if (!response.ok) {
                throw new Error('La solicitud no pudo completarse correctamente');
              }
              setTimeout(() => {
                setIsLoading(false);
              }, 4000);
  
            } catch (error) {
              console.error('Error en la solicitud:', error);
  
              setIsLoading(false);
            }
          }}
        >
        </Button>
      </Link>
    )}
  </Tooltip>
</div>
      <DialogDescription>
    </DialogDescription>
      <DialogDescription className="">
      <div className="flex items-center justify-center my-auto">
      <div className="">
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
          <div>
  <div className="w-full flex justify-start items-center gap-3 flex-wrap">
  <div className="text-white z-30 bg-black/60 h-fit w-fit p-3 rounded-lg md:rounded backdrop-blur-lg flex items-center m-0">
    <Box className="mx-2 text-white" />
    <DialogTitle className="text-sm md:text-xl text-neutral-300" style={{ margin: 0 }}>
      {type !== '' ? type : 'Unknown type.'}
    </DialogTitle>
  </div>

  <div className="text-white z-30 bg-black/60 h-fit w-fit p-3 rounded-lg md:rounded backdrop-blur-lg flex items-center m-0">
    <Bot className="mx-2 text-white" />
    <DialogTitle className="text-sm md:text-xl text-neutral-300" style={{ margin: 0 }}>
      {algorithm !== '' ? algorithm : 'Unknown algorithm'}
    </DialogTitle>
  </div>
  <div className="text-white z-30 bg-black/60 h-fit w-fit p-3 rounded-lg md:rounded backdrop-blur-lg flex items-center m-0">
    <Bot className="mx-2 text-white" />
    <DialogTitle className="text-sm md:text-xl text-neutral-300" style={{ margin: 0 }}>
      {epochs !== '' ? `${epochs} Epochs` : 'Unknown epochs'}
    </DialogTitle>
  </div>
</div>
</div>






          <div className="block md:hidden fixed bottom-0 left-0 right-0 text-center bg-black/80 h-24 overflow-hidden">
  <Link href={link} className="place-content-center mt-8" isExternal target="_blank">
        <Button
          color="secondary"
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