"use client"
import Logo from "@/components/navbar/logo";
import { supabase, supabaseTV } from "@/utils/database";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export default function Upload() {
    const [videoId, setVideoId] = useState("");
    const [title, setTitle] = useState("");
    const [videoStyles, setVideoStyles] = useState<string[]>([]); 
    const [next, setNext] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [sending, setSending] = useState<boolean>(false)
    const locale = useLocale();

    function getVideoId(video_url: string) {
        const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = video_url.match(regex);
    
        if (match) {
            setVideoId(match[1]);
            setNext(true);
        } else {
            setVideoId("");
            setNext(false);
        }
        if (match === undefined) {
            setNext(false)
        }
    }

    function getTitle(title: string) {
        setTitle(title);
        setNext(true);
    }

    function addVideoStyle(style: string) {
        if (videoStyles.includes(style)) {
            setVideoStyles(videoStyles.filter(item => item !== style));
        } else {
            if (videoStyles.length < 3) { 
                setVideoStyles([...videoStyles, style]);
            } else {
            }
        }
    }
    

    function nextPage() {
        setNext(false);
        setPage(page + 1);
    }

    async function send() {
        setSending(true)
        const auth_id = await supabase.auth.getUser()
        if (auth_id){
            const user = await supabase.from("profiles").select("full_name").eq("auth_id", auth_id.data.user?.id).single()
            if (user.data) {
                const { data, error } = await supabaseTV
                .from('videos')
                .upsert({ created_by: user.data.full_name, video_url: videoId, title: title, styles: videoStyles })
                .select()
                .single()

                if (data) {
                    console.log(data)
                    window.location.href = `${locale}/watch/${data.id}`
                }
                if (error) {
                    console.log(error)
                }
            }
        }

    }

    useEffect(() => {
        if (videoStyles.length > 2) {
            setNext(true)
        } else {
            setNext(false)
        }
    }, [videoStyles]);

    
    return (
        <main className="">
            <Logo position="bottom"/>
            {page === 1 && (
            <div className="mx-12 my-16">
                <div className="bg-white/10 w-full h-[80svh] rounded-xl p-6 flex flex-col justify-start gap-4">
                    <h1 className="font-medium md:text-5xl text-4xl p-2 flex-wrap text-left">1. Add your video</h1>
                    <div className="bg-blue-500/10 w-full h-fit py-2 rounded-xl p-2 flex flex-cols-2 gap-4 justify-start items-center px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    <p className="md:font-medium md:text-xl text-xs">For copyright reasons you must upload the video to <a className="underline text-blue-400" href="https://www.youtube.com" target="_blank" rel="notarget">youtube</a>, then copy the URL and paste it here.</p>
                    </div>
                    <div className="md:bg-white/10 w-full md:h-[40svh] h-[30svh] rounded-xl md:px-36 md:py-8">
                        <input placeholder="" onChange={(e) => getVideoId(e.target.value)} autoFocus className="bg-white/10 backdrop-blur-3xl rounded-xl justify-center items-center mx-auto flex w-full h-full text-xl text-center focus:outline-none focus:border-white/10 focus:border resize-none p-2 flex-wrap" type="url" ></input>
                    </div>
                    {next && (
                    <button onClick={nextPage} className="md:mt-12 mb-36 bg-white rounded-xl md:w-52 w-full h-12 flex justify-center items-center mx-auto text-black text-xl font-medium">Next</button>
                    )}
                </div>
            </div>
            )}
            {page === 2 && (
            <div className="mx-12 my-16">
                <div className="bg-white/10 w-full h-[80svh] rounded-xl p-6 flex flex-col justify-start gap-4">
                    <h1 className="font-medium text-5xl p-2 flex-wrap text-left">2. Title your video</h1>
                    <div className="md:bg-white/10 w-svh md:h-[40svh] h-[30svh] rounded-xl md:px-36 py-8">
                        <input placeholder="" onChange={(e) => getTitle(e.target.value)} autoFocus className="bg-white/10 backdrop-blur-3xl rounded-xl justify-center items-center mx-auto flex w-full h-full text-2xl text-center focus:outline-none focus:border-white/10 focus:border resize-none p-2" type="url" ></input>
                    </div>
                    {next && (
                    <button onClick={nextPage} className="mt-12 bg-white rounded-xl w-52 h-12 flex justify-center items-center mx-auto text-black text-xl font-medium">Next</button>
                    )}
                </div>
            </div>
            )}
            {page === 3 && (
            <div className="mx-12 my-16">
                <div className="bg-white/10 w-full md:h-[80svh] h-fit rounded-xl p-6 flex flex-col justify-start gap-4">
                    <h1 className="font-medium md:text-5xl text-xl p-2 flex-wrap text-left">3. What is your video about?</h1>
                    <div className="hidden md:block">
                    <div className="bg-blue-500/10 w-full h-[8svh] rounded-xl p-2 flex flex-cols-2 gap-4 justify-start items-center px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    <p className="md:font-medium md:text-xl text-xs">We will recommend your video according to what you mark, it is important that you do it well to get more views! (Select 3)</p>
                    </div>
                    </div>
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    <a onClick={() => addVideoStyle("Anime")} className={`md:px-6 md:py-4 px-2 py-3 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Anime") ? "bg-white/30" : "bg-white/10"}`}>Anime</a>
                    <a onClick={() => addVideoStyle("Music")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Music") ? "bg-white/30" : "bg-white/10"}`}>Music</a>
                    <a onClick={() => addVideoStyle("Gaming")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Gaming") ? "bg-white/30" : "bg-white/10"}`}>Gaming</a>
                    <a onClick={() => addVideoStyle("Tutorial")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Tutorial") ? "bg-white/30" : "bg-white/10"}`}>Tutorial</a>
                    <a onClick={() => addVideoStyle("Comedy")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Comedy") ? "bg-white/30" : "bg-white/10"}`}>Comedy</a>
                    <a onClick={() => addVideoStyle("Pop")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Pop") ? "bg-white/30" : "bg-white/10"}`}>Pop</a>
                    <a onClick={() => addVideoStyle("Rock")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Rock") ? "bg-white/30" : "bg-white/10"}`}>Rock</a>
                    <a onClick={() => addVideoStyle("Hip Hop")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Hip Hop") ? "bg-white/30" : "bg-white/10"}`}>Hip Hop</a>
                    <a onClick={() => addVideoStyle("Electronic")} className={`md:px-6 px-2 py-2 md:py-4 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Electronic") ? "bg-white/30" : "bg-white/10"}`}>Electronic</a>
                    <a onClick={() => addVideoStyle("Jazz")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Jazz") ? "bg-white/30" : "bg-white/10"}`}>Jazz</a>
                    <a onClick={() => addVideoStyle("Reggaeton")} className={`md:px-6 px-2 py-2 md:py-4 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Reggaeton") ? "bg-white/30" : "bg-white/10"}`}>Reggaeton</a>
                    <a onClick={() => addVideoStyle("R&B")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("R&B") ? "bg-white/30" : "bg-white/10"}`}>R&B</a>
                    <a onClick={() => addVideoStyle("Indie")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Indie") ? "bg-white/30" : "bg-white/10"}`}>Indie</a>
                    <a onClick={() => addVideoStyle("Country")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Country") ? "bg-white/30" : "bg-white/10"}`}>Country</a>
                    <a onClick={() => addVideoStyle("Science Fiction")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Science Fiction") ? "bg-white/30" : "bg-white/10"}`}>Science Fiction</a>
                    <a onClick={() => addVideoStyle("Cooking")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Cooking") ? "bg-white/30" : "bg-white/10"}`}>Cooking</a>
                    <a onClick={() => addVideoStyle("Fitness")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Fitness") ? "bg-white/30" : "bg-white/10"}`}>Fitness</a>
                    <a onClick={() => addVideoStyle("Travel")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Travel") ? "bg-white/30" : "bg-white/10"}`}>Travel</a>
                    <a onClick={() => addVideoStyle("Fashion")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Fashion") ? "bg-white/30" : "bg-white/10"}`}>Fashion</a>
                    <a onClick={() => addVideoStyle("History")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("History") ? "bg-white/30" : "bg-white/10"}`}>History</a>
                    <a onClick={() => addVideoStyle("Art")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Art") ? "bg-white/30" : "bg-white/10"}`}>Art</a>
                    <a onClick={() => addVideoStyle("Technology")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Technology") ? "bg-white/30" : "bg-white/10"}`}>Technology</a>
                    <a onClick={() => addVideoStyle("Education")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Education") ? "bg-white/30" : "bg-white/10"}`}>Education</a>
                    <a onClick={() => addVideoStyle("Documentary")} className={`md:px-6 md:py-4 px-2 py-2 rounded-xl w-full text-center justify-center items-center flex ${videoStyles.includes("Documentary") ? "bg-white/30" : "bg-white/10"}`}>Documentary</a>
                    </div>
                    {next && (
                    <button onClick={send} className="mt-12 bg-white rounded-xl w-52 h-12 flex justify-center items-center mx-auto text-black text-xl font-medium">Finish</button>
                    )}
                </div>
            </div>
            )}

            {/* todo: make user select an ai model voice */}
        </main>
    )
}
