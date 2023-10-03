import { Database } from "@/app/types/database";
import ModelsTable from "@/components/models-table";
import UsersTable from "@/components/users-table";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { useState } from "react";

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  let content = []; 
  let admin = null; // Declarar admin aquí para que esté disponible fuera del bloque else

  if (session === null) {
    redirect('/what-are-you-doing');
  } else {
    const { data: user } = await supabase
      .from('profiles')
      .select('full_name, role, id')
      .eq('id', id)
      .single();

      if (!user || user.role !== 'admin' || user.id !== id) {
        redirect('/what-are-you-doing');
      } else {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();
  
        admin = data;
      }
    }

  return (
  <section>
    <h1 style={{ overflow: 'visible' }} className="hidden md:block text-center text-6xl font-bold leading-tight tracking-tighter md:text-8xl my-4 p-4 bg-gradient-radial text-transparent bg-clip-text">
    Hey, {admin?.full_name}.
  </h1>
  <div className="block md:hidden ">
            <h1 className="bg-gradient-radial-red text-transparent bg-clip-text mx-auto flex items-center justify-center text-4xl font-bold leading-tight tracking-tighter mt-24">
                Please login in PC.
                </h1>
  </div>
<div style={{ display: 'flex', justifyContent: 'space-between' }} className="my-24 mx-64">
  <div style={{ flex: '1', marginRight: '16px' }}>
  <h1 style={{ overflow: 'visible' }} className="hidden md:block text-4xl font-bold leading-tight tracking-tighter my-4 p-4">
    Users:
  </h1>
    <UsersTable id={id} />
  </div>
  <div style={{ flex: '1' }}>
  <h1 style={{ overflow: 'visible' }} className="ml-[85px] hidden md:block text-4xl font-bold leading-tight tracking-tighter my-4 p-4">
    Models:
  </h1>
    <ModelsTable id={id} />
  </div>
</div>
</section>
  );
}
