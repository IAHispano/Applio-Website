"use client"
import { Spinner } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Token {
  id: number;
  created_at: string;
  token: string;
}

export default function ActualKeys() {
  const [userTokens, setUserTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserTokens = async () => {
    const supabase = createClientComponentClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user.id) {
      const { data } = await supabase
        .from('tokens')
        .select('*')
        .eq('user', session.user.id);

      setUserTokens(data || []);
      setLoading(false);
    } else {
      console.error('Error: User ID is undefined.');
    }
  };

  const handleGenerateToken = async () => {
    const supabase = createClientComponentClient();
    const { data: { session } } = await supabase.auth.getSession();
  
    if (session?.user.id) {
      if (userTokens.length >= 3) {
        console.error('Error: You cannot create more than 3 keys.');
        return;
      }
  
      const { data: newToken, error } = await supabase
        .from('tokens')
        .upsert([{ user: session.user.id }]);
  
      if (error) {
        console.error('Error at saving token:', error.message);
      } else {
        fetchUserTokens();
      }
    } else {
      console.error('Error: User ID is undefined.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserTokens();
    };

    fetchData();
  }, []); 

  return (
    <div className='max-w-6xl w-full flex flex-col gap-5 justify-center items-center text-left md:py-5'>
      <div className='flex items-center gap-2 w-full flex-wrap'>
        <h1 className='text-2xl md:text-5xl font-bold tracking-tight flex-grow'>Current keys</h1>
        <a
        className={`flex items-center gap-2 bg-white/90 text-black font-medium max-md:text-sm py-2 px-4 rounded-full gtransition 
        ${userTokens.length < 3 ? 'hover:bg-white cursor-pointer active:opacity-50' : 'opacity-50 cursor-not-allowed'}`}
        onClick={userTokens.length < 3 ? handleGenerateToken : undefined}
      >
          Create a key
          <span className='text-lg md:text-xl rotate-180 gtransition'><PlusCircle /></span>
        </a>
        </div>
      {loading ? (
        <div className='my-4'>
          <Spinner color="success"/>
        </div>
      ) : userTokens.length > 0 ? (
        <section className='w-full flex flex-col items-center justify-center gap-4'>
          {userTokens.map((token: Token) => (
            <article key={token.id} className='w-full bg-black border-2 border-white/30 rounded-3xl'>
              <div className='flex flex-col text-left justify-start items-start gap-2 p-3'>
                <p className='text-sm uppercase font-semibold tracking-wider px-1 text-neutral-500'>
                  {new Date(token.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}
                </p>
                <p className='text-3xl p-1 whitespace-pre-line select-all blur-xl hover:blur-none font-bold gtransition'>{token.token}</p>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <p className='text-lg text-neutral-500 mt-4'>No tokens available. Click &quot;Create a key&quot; to generate one.</p>
      )}
    </div>
  );
}
