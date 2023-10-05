"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const addPost = async (formData: FormData) => {
  const supabase = createServerActionClient({ cookies });
  const supabase_admin = createClient('URL', 'SECRET KEY')


  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user === null) return;

  const { data: userProfile } = await supabase
  .from("profiles")
  .select("id")
  .eq("auth_id", user.id)
  .single();

  await supabase
  .from('profiles')
  .delete()
  .eq('auth_id', user.id)

  const { data, error } = await supabase.auth.admin.deleteUser(user.id);

  await supabase.auth.signOut();
  redirect("/");
};