
import Link from "next/link"
import {
  createClientComponentClient
} from "@supabase/auth-helpers-nextjs"
import ModelCard from "@/components/model-card"
import { ArrowRight } from "lucide-react"

export default async function Home() {
  const supabase = createClientComponentClient()
  const { data: posts } = await supabase
    .from("models")
    .select("*")
    .order("created_at", { ascending: true })
  

  return (
    
    <section>
      <div className="fixed rounded-2xl w-11/12 sm:w-[581px] h-40 sm:h-[80px] p-0.5 z-10 bottom-10 left-0 right-0 mx-auto">
        <div className="rounded-[14px] w-full h-full bg-background border border-white-50 md:border-0  flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
        <p className="text-white text-[13px] w-[304px] h-10 flex items-center justify-center p-3">Enjoy +8000 voice models available in our database!
        </p>
        <a className="text-black text-[13px] bg-white hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center " href="https://applio.org/bot" target="_blank" rel="noreferrer">Get Applio Bot <div className="ml-2"><ArrowRight size={20} strokeWidth={1.5} /></div></a>
        </div>
        </div>
      <div className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
        <h1 className="text-8xl font-bold leading-tight tracking-tighter md:text-9xl mt-4 ">
          Models
        </h1>
        <p className="mt-4 text-muted-foreground  text-xs md:text-xl">
          Enjoy +8000 voice models available in our database!
        </p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-5 py-8 md:py-10 mx-14">
        {posts?.map((post: any) => {
          const {
            name,
            image_url: imageUrl,
            created_at: created_at,
            link,
          } = post

          const modelSlug = link

          return (
            <Link key={modelSlug} href={`${link}`} id={link}>
              <div className="w-full">
                <ModelCard
                  name={name}
                  imageUrl={imageUrl}
                  created_at={created_at}
                />
              </div>
            </Link>
          )
        })}
      </section>
    </section>
  )
}
