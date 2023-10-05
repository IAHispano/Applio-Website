import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { User2 } from "lucide-react";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Avatar } from "@nextui-org/react";
import Information from "@/components/account/settings/information";
import { Database } from '../../types/database';

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  let content = null;

  if (session === null) {
    redirect('/login');
  } else {
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('auth_id', session?.user.id)
      .single();

    if (!userProfile) {
      redirect('/what-are-you-doing'); 
    } else if (userProfile.id !== id) {
      redirect('/what-are-you-doing'); 
    } else {
      content = (
          <Information full_name={userProfile.full_name} avatar_url={userProfile.avatar_url} role={userProfile.role} bio={userProfile.bio}/>
      );
    }
  }

  return content; 
}
