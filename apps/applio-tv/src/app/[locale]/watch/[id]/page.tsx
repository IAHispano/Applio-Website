"use client"
import Logo from "@/components/navbar/logo";
import { supabase, supabaseTV } from "@/utils/database";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function WatchVideo({ params }: { params: { id: string } }) {
    const { id } = params
    const [data, setData] = useState<any>()
    const [error, setError] = useState<PostgrestError>()
    const [loaded, setLoaded] = useState<boolean>(false)

    async function sendHistory(videoData: any) {
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error("Error fetching user data:", userError);
                return;
            }

            const { data: userProfile, error: profileError } = await supabase
                .from("profiles").select("full_name").eq("auth_id", userData.user.id).single();

            if (profileError) {
                console.error("Error fetching user profile:", profileError);
                return;
            }

            const historyInsert = {
                see_by: userProfile.full_name, 
                video_id: id, 
                video_styles: videoData.data[0].styles
            };

            const { error: historyError } = await supabaseTV
                .from('history')
                .insert(historyInsert);
            
            if (historyError) {
                console.error("Error inserting into history:", historyError);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchData() {
        try {
            const {data, error} = await supabaseTV.from("videos").select("*").eq("id", id).single();
            if (data) {
                setData(data)

                // add view to db
                const UpdatedView = data.displays + 1 ;
                const videoData = await supabaseTV
                    .from('videos')
                    .update({ displays:  UpdatedView})
                    .eq('id', id)
                    .select()

                if (videoData.data) {
                    if (loaded === true) {
                    sendHistory(videoData)
                    }
                } else {
                    console.log("No video data available for history insertion.");
                }

                if (error) {
                    console.log(error)
                }
            } else {
                setData(null)
            }

            if (error) {
                setError(error)
                console.log(error)
            }
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [loaded]);

    return (
        <main className="">
            <Logo position="bottom"/>
            {data && (
                <section className="grid gap-4 m-4">
                <div className="bg-white/10 w-full md:h-[800px] h-[60vh] rounded-xl">
                    <iframe className="w-full h-full rounded-xl" src={`https://www.youtube.com/embed/${data.video_url}?autoplay=1&controls=1`} allowFullScreen onLoad={() => setLoaded(true)}></iframe>
                </div>
                <div className="bg-white/10 w-full h-[15vh] rounded-xl p-3 text-left">
                    <h1 className="text-3xl font-medium truncate max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">{data.title}</h1>
                    <h2 className="text-sm ml-0.5">created by {data.created_by}</h2>
                    <h2 className="text-sm ml-0.5">uploaded at {new Date(data.created_at).toLocaleDateString()}</h2>
                    <h2 className="text-sm ml-0.5">see by {data.displays} people</h2>
                </div>
                </section>
            )}
        </main>
    )
}
