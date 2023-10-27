"use client";

import { Divider, Link } from "@nextui-org/react";
import {Card, CardFooter, Image, Button} from "@nextui-org/react";

interface ModelInfoProps {
  avatar_url: string;
  full_name: string | null;
  role: string;
  bio: string;
}

function Events({ avatar_url, full_name, role, bio }: ModelInfoProps) {
  
    

  return (
    <div>
    <h2 className="text-4xl font-bold tracking-tight mb-4">Upcoming events:</h2>
    <Divider />
    <h2 className="text-2xl font-semibold tracking-tight mt-4">Halloween:</h2>
    <p className="text-xs md:text-sm tracking-tight dark:text-neutral-300 text-left">(October)</p>
    <section className="w-full grid grid-cols-5 gap-3 items-center justify-center py-4 mx-auto">
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 w-40 bg-[#974200]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">27</h1>
    </Card>
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 bg-[#974200]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">28</h1>
    </Card>
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 bg-[#974200]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">29</h1>
    </Card>
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 bg-[#974200]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">30</h1>
    </Card>
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 bg-[#974200]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">31</h1>
    </Card>
    </section>
    <Divider />
    <h2 className="text-2xl font-semibold tracking-tight mt-4">Christmas:</h2>
    <p className="text-xs md:text-sm tracking-tight dark:text-neutral-300 text-left">(December)</p>
    <section className="w-full grid grid-cols-5 gap-3 items-center justify-center py-4 mx-auto">
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 bg-[#2f7336]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">22</h1>
    </Card>
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 bg-[#2f7336]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">23</h1>
    </Card>
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 bg-[#2f7336]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">24</h1>
    </Card>
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 bg-[#2f7336]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">25</h1>
    </Card>
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-48 bg-[#2f7336]"
    >
      <h1 className="text-8xl font-semibold mx-auto my-auto">26</h1>
    </Card>
    </section>
    </div>
  );
}
export default Events;