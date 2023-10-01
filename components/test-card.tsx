import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Image, Divider, Chip } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default function TestCard({
  imageUrl,
  name,
  created_at,
  id,
  userFullName
}: {
  imageUrl: string;
  name: string;
  created_at: string;
  id: string;
  userFullName?: string;
}) {
  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',   
    };
    return new Date(dateString).toLocaleDateString('en-US', options); 
  }

  const formattedDate = formatDate(created_at);
  const cardStyle = {
    height: '150px',
    overflow: 'hidden', 
  };
  return (
    <Card style={cardStyle} className="mx-auto flex items-center justify-center">
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
  );
}
