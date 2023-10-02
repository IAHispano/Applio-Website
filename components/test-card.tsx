import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Divider, Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link, Checkbox } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";


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
          {name}
        </p>
      </CardBody>
      
      <CardFooter style={{ fontSize: 'smaller' }} className="mx-auto flex items-center justify-center">
<Chip className="mx-1 text-black dark:text-neutral-200" radius="sm" variant="dot" color="success" size="sm">
  {userFullName}
  {userFullName ? " on " : ''}
  {formattedDate}
</Chip>
      </CardFooter>
    </Card>
  </DialogTrigger>
  <DialogContent className="max-w-9xl w-6/12 h-3/6  rounded-3xl undefined bg-background/[.9] " style={{ width: '70%', height: '70%' }}>
    <DialogHeader>
    <DialogTitle className="text-xl md:text-6xl mt-4">
    {name !== null ? name : null}
    </DialogTitle>
    <DialogTitle className="text-sm md:text-2xl text-neutral-500 ml-1">
      {author_id !== null ? `Created by ${author_id}` : null}
    </DialogTitle>
    <DialogTitle className="text-sm md:text-xl text-neutral-300 ml-1">
      {type !== null ? type : null}
    </DialogTitle>
    <DialogTitle className="text-sm md:text-xl text-neutral-300 ml-1">
      {epochs !== null ? `${epochs} Epochs` : null}
    </DialogTitle>
    <DialogTitle className="text-sm md:text-xl text-neutral-300 ml-1">
      {algorithm !== null ? algorithm : null}
    </DialogTitle>
      <DialogDescription>
      <Link href={link} className="md:my-8 md:mr-8 place-content-center sm:place-content-center" isExternal target="_blank" 
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}>
        <Button
          color="primary"
          variant="shadow"
          size="lg"
        >
          Download
        </Button>
        </Link>
    </DialogDescription>
      <DialogDescription className="">
      <div className="flex items-center justify-center mx-auto">
      <div className="relative md:h-80 md:w-6/12 h-60 w-full ">
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
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
  
  );
}
