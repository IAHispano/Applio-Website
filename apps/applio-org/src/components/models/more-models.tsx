import { supabase } from "@/utils/database";
import { useEffect, useState } from "react"
import ModelCard from "./model-card";
import { Model } from "@/types/modelsTypes";

export default function MoreModels({ tags, full_name, id }: { tags: any, full_name: string, id: string }) {
    const [data, setData] = useState<Model[] | null>()

    useEffect(() => {
        async function getMoreModels() {
            const { data, error } = await supabase.from("models").select("*").eq("author_id", id).limit(3);
            if (data) {
                setData(data)
                console.log(data)
            }
            if (error) {
                console.log(error)
                setData(null)
            }
        }

        getMoreModels();
    }, []);

    return (
        <section className="mt-6 text-white/80 w-full">
            <p>More models by {full_name}</p>
            <div className="grid grid-cols-3 mt-2 w-full gap-4 flex justify-center items-end m-auto">
            {data && data.map((model: Model) => (
            <div key={model.id} className="border border-white/10 py-2 p-4 rounded-xl w-full text-white">
                <p className="text-sm text-white/60">by {model.author_username}</p>
                <h2 className="font-bold max-w-[140px] truncate">{model.name}</h2>
            </div>
            ))}
            </div>
        </section>
    )
}