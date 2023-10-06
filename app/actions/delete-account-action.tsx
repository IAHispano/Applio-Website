"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const addPost = async (formData: FormData) => {
  const supabase = createServerActionClient({ cookies });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error("SUPABASE_URL SUPABASE_SERVICE_KEY error.");
    return;
  }
  const supabase_admin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );


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

  const { data, error } = await supabase_admin.auth.admin.deleteUser(user.id);

  await supabase.auth.signOut();
  redirect("/");
};