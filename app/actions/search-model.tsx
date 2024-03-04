"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getModelsByTitle = async (title: string, order?: string) => {
  const supabase = createClientComponentClient({});

  let query = supabase.from('models').select('*').ilike('name', `%${title}%`);

  if (order) {
    query = query.order(order, { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query.range(0, 14);

  if (error) {
    console.log(error.message);
    return [];
  }

  return data || [];
};

export default getModelsByTitle;