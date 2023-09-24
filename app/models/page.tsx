import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ModelCard from "@/components/model-card";
import Link from "next/link";
import { Database } from "../types/database";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const supabase = createClientComponentClient();
  const { data: posts } = await supabase
    .from('models')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <section >
    <div className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
    <h1 className="text-9xl font-bold leading-tight tracking-tighter md:text-9xl mt-4 ">Applio <span className="bg-gradient-radial text-transparent bg-clip-text">Bot</span></h1>
    <p className="mt-4 text-muted-foreground  text-xs md:text-xl">
    These models represent only a sample of our +8000 available models.
    </p>   
    </div>
    <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-5 py-8 md:py-10 mx-14">
        {posts?.map((post: any) => {
      const {
        name,
        image_url: imageUrl,
        created_at: created_at,
        link
      } = post;

      const modelSlug = link;

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
      );
    })}

    </section>
    </section>
  );
}
