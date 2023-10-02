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
  link
}: {
  imageUrl: string;
  name: string;
  created_at: string;
  id: string;
  userFullName?: string;
  link: string;
}) {
  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',   
    };
    return new Date(dateString).toLocaleDateString('en-US', options); 
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
  <DialogContent className="max-w-9xl w-6/12 h-3/6" style={{ width: '70%', height: '70%' }}>
    <DialogHeader>
      <DialogTitle className="text-xl md:text-6xl mt-4">{name}</DialogTitle>
      <DialogTitle className="text-sm md:text-2xl text-neutral-500 ml-1">Created by {id}</DialogTitle>
      <DialogDescription>
      <Link href={link} className="md:my-8 md:mr-8 place-content-center sm:place-content-center" isExternal
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}>
        <Button
          color="primary"
          variant="shadow"
        >
          Download
        </Button>
        </Link>
    </DialogDescription>
      <DialogDescription className="">
      <div className="flex items-center justify-center md:mt-10">
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
