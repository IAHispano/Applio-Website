import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from '../../types/database';
import { AsideSelection } from '@/components/account/settings/aside';

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  let content = null;
  let section = '';

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
        <AsideSelection full_name={userProfile.full_name} avatar_url={userProfile.avatar_url} role={userProfile.role} bio={userProfile.bio}/>
      );
    }
  }

  return content; 
}
