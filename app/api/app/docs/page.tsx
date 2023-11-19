import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ApiDashboard from '@/components/api/dashboard';
import { Database } from '@/app/types/database';
import ApiDocs from '@/components/api/docs/docs';

export default async function User() {
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
    } else if (userProfile.auth_id !== session.user.id) {
      redirect('/what-are-you-doing'); 
    } else {
      content = ( 
        <main className='min-h-screen flex flex-col justify-start items-center py-10 w-full px-5'>
        <ApiDashboard auth_id={session.user.id} current_page='docs'/>
        <div className='max-w-6xl w-full flex flex-col gap-5 md:gap-10 justify-center items-center text-left'>
        <ApiDocs/>
        </div>


        </main>
      );
    }
  }

  return content; 
}
