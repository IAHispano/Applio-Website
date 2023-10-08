"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

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
  .select("likes, liked_by")
  .eq("id", id)
  .single();

if (!modelData) return;

const { likes, liked_by } = modelData;

// Verificar si el usuario ya ha dado like
let newLikedBy;
if (liked_by && Array.isArray(liked_by)) {
  newLikedBy = [...liked_by, user.id];
} else {
  // Si liked_by es null o no es un array, inicializarlo como un nuevo array con el ID del usuario
  newLikedBy = [user.id];
}

const newLikes = likes + 1;

await supabase
  .from("models")
  .update({ likes: newLikes, liked_by: newLikedBy })
  .eq("id", id);

  revalidatePath('/')
}