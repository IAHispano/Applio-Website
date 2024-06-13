import { supabase } from "@/utils/database";
import ModelCard from "../models/model-card";
import { useState } from "react";
import ModelPopup from "../models/model-popup";

export default function UserModels({ data }: { data: any[] }) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupId, setPopupId] = useState<string | null>(null);
    
    async function sendView(id: string) {
        const data2 = await supabase.auth.getUser();
        if (data2 && data2.data.user) {
            const userInfo = await supabase.from("profiles").select("full_name, id").eq("auth_id", data2.data.user.id).single()
            if (userInfo.data) {
            const views = await supabase.from("views").insert({ by: userInfo.data.full_name, model: id, by_id: userInfo.data.id })
            } 
          } else {
            const views = await supabase.from("views").insert({ by: 'Unknown', model: id, by_id: 'Unknown' })
          }

      }
      
      const handleClosePopup = () => {
        setShowPopup(false);
        setPopupId(null);
        document.body.style.overflow = 'unset';
        const originalUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.replaceState({ path: originalUrl }, '', originalUrl);
      };

      const handleOpenPopup = (id: string) => {
        if (id) {
          setPopupId(id as string);
          setShowPopup(true);
          const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?id=${id}`;
          window.history.replaceState({ path: newUrl }, '', newUrl);
          if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
            document.body.style.overflow = 'hidden';
          }

          // send view to db
          if (!popupId || popupId !== id) {
            sendView(id);
          }
        }
      }

    return (
        <section className="mt-44 w-full grid gap-4 md:grid-cols-4 z-30 flex justify-center items-center mx-auto">
            {showPopup && <ModelPopup id={popupId} onClose={handleClosePopup} />}
            {Array.isArray(data) && data.map((model: any, index: number) => {
                return (
                    <a className="w-full h-full flex cursor-pointer mx-4" key={index} onClick={(e) => { e.preventDefault(); handleOpenPopup(model.id); }}>
                              <div className="bg-neutral-700/30 border border-white/10 rounded-lg w-full h-full max-md:p-6 p-5 hover:shadow-sm hover:shadow-white/10 slow">
                                <div className="md:justify-between flex max-md:flex-col">
                                <div>
                                <h1 className="text-2xl max-xs:max-w-[50px] max-lg:max-w-[500px] max-xl:max-w-[600px] max-w-5xl max-md:text-wrap truncate text-left font-semibold">{model.name}</h1>
                                <h2 className="text-white/80 text-xl text-left">by {model.author_username}</h2>
                                </div>
                                </div>
                                <div className="md:justify-between max-md:flex md:items-center max-md:flex-col flex md:mt-4 mt-2">
                                <div className="grid max-md:grid-cols-3 grid-cols-5 gap-2 max-md:mt-4 h-full max-md:w-full">
                                {model.tags && (
                                <>        
                                {model.tags.split(',').map((tag: string, index: number) => (
                                <div key={index} className="border border-white/10 rounded-xl py-2 w-full text-center text-sm md:px-4">
                                    <p className="" key={index}>{tag}</p>
                                </div>
                                ))}
                                </>
                                )}
                                </div>
                                <div>
                                <p className="text-white/70 max-md:mt-4 max-md:text-right">published {(() => { const t = Math.round((new Date().getTime() - new Date(model.created_at).getTime()) / (1000 * 60)); return t < 60 ? `${t} minutes` : t < 1440 ? `${Math.floor(t / 60)}h` : `${Math.floor(t / 1440)} days`; })()} ago</p>
                                </div>
                                </div>
                            </div>
                    </a>
                );
            })}
        </section>
    );
}
