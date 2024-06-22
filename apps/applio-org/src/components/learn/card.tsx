import { Guide } from "@/types/guidesTypes";

export default function Card(data: Guide) {
    return (
        <a href={`/learn/${data.id}`} className="w-full h-fit min-h-fit rounded-xl bg-neutral-400/10 p-4 border border-white/[5%] hover:shadow-xl slow hover:shadow-white/[5%] drop-shadow-xl hover:bg-neutral-400/20">
          <p className="text-white/60 text-sm">{data.type || "AI"} · {data.created_at ? new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "May 13, 2024"}</p>
          <h1 className="my-2 text-4xl font-semibold max-w-6xl max-md:text-wrap md:truncate text-left">{data.title}</h1>
        </a>
    )
}