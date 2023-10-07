"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export const addPost = async (formData: FormData) => {
  const id = formData.get("id");

  if (
    id === null 
  )
    return;

  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user === null) return;

  const { data: modelData } = await supabase
    .from("models")
    .select("likes")
    .eq("id", id)
    .single();


  console.log(modelData);
  if (!modelData) return;

  const newLikes = modelData.likes + 1;

  const { error } = await supabase
    .from("models")
    .update({ likes: newLikes })
    .eq("id", id);

  console.log(modelData);
  redirect(`/models`);
};