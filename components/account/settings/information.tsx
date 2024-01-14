"use client";

import { Avatar, Button, Chip, Divider, Input, Switch } from "@nextui-org/react";
import { Trash2, User2 } from "lucide-react";
import { DeleteAccountButton } from "./button-delete-account";
import { ChangeBioButton } from "./change-bio-button";
import { addPost } from "@/app/actions/change-bio";
import React from "react";
import { IconBat, IconFlare } from "@tabler/icons-react";
import { useRef, useEffect } from "react";
import Cookies from 'js-cookie';

interface ModelInfoProps {
  avatar_url: string;
  full_name: string | null;
  role: string;
  bio: string;
  links: Array<any>;
}

function Information({ avatar_url, full_name, role, bio, links }: Readonly<ModelInfoProps>) {
  const formRef = useRef<HTMLFormElement>(null);


  return (
    <div>
    <h2 className="text-4xl font-bold tracking-tight mb-4">Account</h2>
    <Divider />
    <form
        ref={formRef}
        action={async (formData) => {
          await addPost(formData);
          formRef.current?.reset();
        }}
      >
    <section className="w-full flex flex-col items-start justify-start gap-4 my-4 ">
      <Input className="text-sm text-neutral-300" 
      defaultValue={bio} 
      type="bio"
      label="Biography"
      fullWidth
      key="bio"
      name="bio"
      isClearable
      radius="sm"
      >
        </Input>
    </section>
    <section className="w-full flex flex-col items-start justify-start gap-4 my-4 ">
      <Input className="text-sm text-neutral-300" 
      defaultValue={links[0]} 
      type="link1"
      label="Link 1"
      fullWidth
      key="link1"
      name="link1"
      isClearable
      radius="sm"
      >
        </Input>
    </section>
    <section className="w-full flex flex-col items-start justify-start gap-4 my-4 ">
      <Input className="text-sm text-neutral-300" 
      defaultValue={links[1]} 
      type="link2"
      label="Link 2"
      fullWidth
      key="link2"
      name="link2"
      isClearable
      radius="sm"
      >
        </Input>
    </section>
    <div className="items-end justify-end flex flex-col gap-4" >
    <ChangeBioButton />
    </div>
    </form>
    <section className="w-full flex flex-col items-start justify-start gap-4">
    <h2 className="text-2xl font-semibold tracking-tight mb-2">Danger zone</h2>
      <article className="flex flex-col gap-1 text-left max-w-xl justify-start items-start bg-neutral-700/40 rounded-xl p-4">
      <p className="font-medium">Delete Applio account.</p>
      <span className="text-sm text-neutral-400">By clicking delete account button, you will lose access to the page until you log back in to Discord. Your data will be deleted.</span>
      <br />
      <DeleteAccountButton />
      
      </article>
    </section>
    </div>
  );
}
export default Information;