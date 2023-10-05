"use client";

import { Avatar, Button, Chip, Divider, Input } from "@nextui-org/react";
import { Trash2, User2 } from "lucide-react";
import { DeleteAccountButton } from "./button-delete-account";
import { ChangeBioButton } from "./change-bio-button";
import { useRef } from "react";
import { addPost } from "@/app/actions/change-bio";

interface ModelInfoProps {
  avatar_url: string;
  full_name: string | null;
  role: string;
  bio: string;
}

function Information({ avatar_url, full_name, role, bio }: ModelInfoProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-full flex fixed h-full justify-center items-center pt-16 text-white dark:text-white">
    <div className="max-w-7xl w-full h-full flex p-2 max-md:pt-16 gap-2">
      <aside className="hidden md:w-72 xl:w-96 bg-neutral-900 h-96 p-5 gap-5 md:flex flex-col rounded-3xl gtransition">
        <h2 className="text-4xl font-bold tracking-tight">
        Settings
        </h2>
        <div className="flex flex-col gap-3 overflow-y-auto rounded-2xl">
          <a className="flex gap-3 items-center justify-start p-3 hover:bg-neutral-600 active:opacity-50 rounded-2xl bg-neutral-600 gtransition">
          <span className="text-xl"><User2 /></span>
            <span>Account</span>
          </a>
        </div>
      </aside>
      <div className="flex-grow bg-neutral-900 h-3/4 p-5 gap-5 flex flex-col rounded-3xl overflow-y-auto">
    <h2 className="text-4xl font-bold tracking-tight">Account</h2>
    <Divider />
    <section className="w-full flex flex-col items-start justify-start">
      <h2 className="text-2xl font-semibold tracking-tight mb-2">Information</h2>
      <div className="flex items-center justify-center p-3 w-full bg-neutral-700 gap-3 rounded-3xl">
      <Avatar
      isBordered
      radius="md"
      className="rounded-xl border-2 border-white/30 h-16 w-16 aspect-square"
      src={avatar_url}
    />
      <div className="flex-grow h-full flex justify-center items-start text-left flex-col">
        <h2 className="text-2xl font-semibold tracking-tight pb-2">
          {full_name}
        </h2>
        <Chip size="md" className="text-neutral-400 bg-neutral-900">
          {role}
        </Chip>
      </div>
      </div>
    </section>
    <form
        ref={formRef}
        action={async (formData) => {
          await addPost(formData);
          formRef.current?.reset();
        }}
      >
    <section className="w-full flex flex-col items-start justify-start gap-4">
      <Input className="text-sm text-neutral-300" 
      defaultValue={bio} 
      type="bio"
      label="Biography"
      fullWidth
      key="bio"
      name="bio"
      isClearable
      >
        </Input>
    </section>
    <div className="items-end justify-end flex flex-col gap-4" >
    <ChangeBioButton />
    </div>
    </form>
    <section className="w-full flex flex-col items-start justify-start gap-4">
    <h2 className="text-2xl font-semibold tracking-tight mb-2">Danger zone</h2>
      <article className="flex flex-col gap-1 text-left max-w-xl justify-start items-start bg-neutral-700/40 rounded-2xl p-4">
      <p className="font-medium">Delete applio account.</p>
      <span className="text-sm text-neutral-400">By clicking delete account button, you will lose access to the page until you log back in to Discord. Your data will be deleted.</span>
      <br />
      <DeleteAccountButton />
      
      </article>
    </section>
    </div>
    </div>
</div>
  );
}
export default Information;