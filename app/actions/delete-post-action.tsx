"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export const addPost = async (formData: FormData) => {
  const id = formData.get("id");
  const author_id = formData.get("author_id");

  if (
    id === null 
  )
    return;

  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user === null) return;

  await supabase
    .from("models")
    .delete()
    .eq('id', id);

    redirect(`/settings/${author_id}`);
};