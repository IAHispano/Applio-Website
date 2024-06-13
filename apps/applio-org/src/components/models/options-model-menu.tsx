import { supabase } from "@/utils/database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function OptionsModelMenu({ id }: { id: string }) {
    const [clicked, setClicked] = useState(false)
    const [liked, setLiked] = useState(false)
    const router = useRouter();

    function handleShare() {
        // CHANGE THIS TO APPLIO.ORG!
        navigator.clipboard.writeText(`https://v2.applio.org/models?id=${id}`)
    }

    async function handleDownload() {

    }

    async function handleLike() {
        setClicked(true)
        if (!liked) {
            setLiked(true)
        }

        if (liked) {
            setLiked(false)
        }
    }

    async function sendLike() {
        const auth = await supabase.auth.getUser();

        if (auth.data && auth.data.user) {
            const profile = await supabase.from("profiles").select("id, full_name").eq("auth_id", auth.data.user.id).single();
            console.log(liked)
            if (liked && profile.data && clicked) {
                const { data, error } = await supabase.from("likes").insert({ by: profile.data.full_name, by_id: profile.data.id, model: id });
                if (data) {
                    console.log('hola')
                }
                if (error) {
                    console.log(error)
                }
            }
            if (!liked && profile.data && clicked) {
                const { data, error } = await supabase.from("likes").delete().eq("by_id", profile.data.id);
                if (data) {
                    
                }
                if (error) {
                    console.log(error)
                }
            }

            if (profile.data && !clicked && !liked) {
                const {data, error} = await supabase.from("likes").select().eq("by_id", profile.data.id).eq("model", id);
                if (data && data?.length  > 0) {
                    console.log('hola2')
                    setLiked(true) 
                } 
                console.log(data)
            }

            if (profile.data && !clicked && !liked ) {
                const {data, error} = await supabase.from("likes").select().eq("by_id", profile.data.id).eq("model", id);
                if (data && data?.length  > 0) {
                    console.log('hola2')
                    setLiked(true) 
                }      
            }

        } else {
            if (clicked) {
            router.push('/login');
            }
        }
    }

    useEffect(() => {
        sendLike();
    }, [id, liked]);

    return (
        <div className='flex gap-2 max-md:mb-6'>
            <button className={`bg-white/10 hover:bg-white/20 slow px-5 py-2 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl`} onClick={handleShare}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            </button>
            <button className={`${liked ? 'bg-white/30 hover:bg-white/40' : 'bg-white/10 hover:bg-white/20'} slow px-5 py-2 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl`} onClick={handleLike}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
            </button>
            <button className={`bg-white/10 hover:bg-white/20 slow px-5 py-2 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl`} onClick={handleDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </button>
    </div>
    )
}