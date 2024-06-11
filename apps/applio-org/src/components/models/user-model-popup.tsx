"use client"
import { User } from '@/types/userTypes';
import { supabase } from '@/utils/database';
import { useState, useEffect } from 'react';

const UserModelPopup = ({ id }: { id: string | null }) => {
    const [data, setData] = useState<User | null>()


    useEffect(() => {
        async function getUserInfo(id: string) {
            const {data, error} = await supabase.from("profiles").select("*").eq("id", id).single();

            if (data) {
                setData(data)
            }

            if (error) {
                setData(null)
                console.log(error)
            }
        }

        getUserInfo(id as string);
    }, [id]);

  return (
    <article>
    {data && (
        <a className='flex text-center w-full h-full border border-white/10 rounded-xl py-2 px-4' href={`/${data.full_name}`}>
        <div className='w-full h-full rounded-xl bg-neutral-700 hover:bg-neutral-600 slow flex'>
        {data.avatar_url && (
            <img 
                src={data.avatar_url || ''} 
                className='w-16 h-16 rounded-l-xl max-md:rounded-xl max-md:h-full max-md:w-full' 
                onError={() => setData(null)}
            />
        )}
        <p className='font-bold text-center justify-center m-auto items-center max-w-[120px] truncate max-md:hidden'>By {data.full_name || '?'}</p> 
        </div>
        </a>
    )}
    {!data && (
        <div className='flex text-center w-full h-full border border-white/10 rounded-xl py-2 px-4'>
        <div className='w-full h-full rounded-xl bg-neutral-700 flex justify-center items-center md:px-6 px-4 max-md:py-4'>
        <svg width="24" height="24" viewBox="0 0 202 242" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M202 232.925C202 235.332 201.046 237.64 199.349 239.342C197.652 241.044 195.35 242 192.95 242H9.05018C6.64992 242 4.34797 241.044 2.65073 239.342C0.953497 237.64 0 235.332 0 232.925C0 183.315 54.3011 144.837 101 144.837C147.699 144.837 202 183.315 202 232.925ZM162.541 61.831C162.517 74.0309 158.888 85.95 152.111 96.0822C145.334 106.214 135.715 114.105 124.467 118.757C113.22 123.409 100.85 124.614 88.9201 122.219C76.9902 119.825 66.0359 113.938 57.4413 105.303C48.8467 96.6677 42.9974 85.6718 40.6326 73.7046C38.2678 61.7373 39.4935 49.3357 44.155 38.0667C48.8164 26.7978 56.7043 17.1671 66.8221 10.3917C76.9399 3.61622 88.8334 2.34524e-05 101 0C117.333 0.0320502 132.986 6.56052 144.524 18.1526C156.061 29.7447 162.541 45.4533 162.541 61.831Z" fill="white"/>
        </svg>
        <p className='max-md:text-sm md:font-bold text-center justify-center m-auto items-center max-w-[120px] text-wrap'>User not found</p> 
        </div>
        </div>
    )}
    </article>
  );
};

export default UserModelPopup;
