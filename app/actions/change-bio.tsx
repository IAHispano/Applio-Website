"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addPost = async (formData: FormData) => {
  const bio = formData.get("bio");

  if (
    bio === null 
  )
    return;

  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user === null) return;
  
  const currentTime = new Date().toISOString();
  const { data: userProfile } = await supabase
  .from("profiles")
  .select("id")
  .eq("auth_id", user.id)
  .single();

  const { error } = await supabase
  .from('profiles')
  .update({ 
    bio: bio,
    updated_at: currentTime
  })
  .eq('auth_id', user.id)
    

  redirect(`/users/${userProfile?.id}`);
};