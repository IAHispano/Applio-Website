import Guide from "@/components/guides/guide";
import { Plus } from "lucide-react";

export default function Guides() {

    return (
        <main className="min-h-screen flex flex-col justify-start items-center py-4 w-full px-5">
            <section className="max-w-[1200px] w-full flex flex-col gap-5 justify-center items-center text-left py-5">
                <div className="flex items-center gap-2 w-full flex-wrap">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex-grow">Guides</h1>
                    <a className="flex items-center gap-2 bg-white/90 text-black hover:bg-white active:opacity-50 font-medium max-md:text-sm py-2 px-4 rounded-full gtransition cursor-pointer" href="/guides/create">
                        New
                        <span className="text-lg md:text-xl rotate-180 gtransition"><Plus /></span>
                    </a>
                </div>
                <Guide />
            </section>
        </main>
    )
}
