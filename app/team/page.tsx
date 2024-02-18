import Team from "@/components/team/team";

export default function Home() {
    return (
      <main className="nx-mx-auto nx-flex nx-max-w-[90rem]">
        <article className="w-full break-words min-h-[calc(100vh-var(--nextra-navbar-height))] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
            <div className="relative">
                <div className="mx-auto">
                    <div className="md:py-16 py-4 lg:text-center">
                        <p className="text-base font-semibold leading-6 tracking-wide text-[#00AA68] uppercase ">TEAM</p>
                        <h1 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight md:text-5xl text-white sm:text-4xl sm:leading-10 font-mono">
                        We would be nothing without you
                        </h1>
                        <p className="max-w-3xl mt-4 text-xl leading-7 text-gray-500 dark:text-gray-400 lg:mx-auto">
                        </p>          
                        {process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
                          <Team />
                        ) : (
                          <p className="text-neutral-300 text-center h-[400px] flex justify-center items-center text-3xl">Development mode activated</p>
                        )}
                    </div>
                </div>
            </div>
        </article>
      </main>
    )
  }