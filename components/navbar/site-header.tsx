import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/navbar/main-nav"
import { AuthButtonServer } from "../login/auth-button-server"
import HeaderMobile from "./site-header-mobile"

export async function SiteHeader() {

  return (
    <section>
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
      <div className=" hidden md:block">
      <header className="w-full fixed top-0 left-0 h-16 bg-neutral-800/20 backdrop-blur-lg justify-center px-3 z-50 items-center border-b border-white/20 rounded-b-sm flex overflow-hidden">
      <a href="/" className="mr-2 flex gap-2.5 items-center truncate hover:bg-white/10 active:bg-white/20 active:scale-90 p-2.5 rounded-xl false gtransition [&_img]:hover:ml-0 [&_img]:hover:scale-100 [&_img]:hover:blur-none [&_img]:hover:opacity-100">
            <div className="w-8 h-8 aspect-square">
              <img id="a" src="/no_bg_applio_logo.png" className="md:-ml-10 md:scale-75 md:blur md:opacity-0 gtransition" alt="logo"/>
            </div>
            <h1 className="text-2xl font-semibold truncate tracking-tight">Applio</h1>
        </a>
        <a className="flex rounded-full bg-[#00AA68]/80 uppercase px-2 py-1 text-xs font-bold hover:shadow-xl hover:shadow-[#00AA68]/50 gtransition" href="/premium">Premium</a>
        <div className="w-full max-w-6xl justify-center items-center flex gap-2.5 h-full">
          <div className="flex-grow h-full flex items-center justify-center mx-auto">
            <MainNav items={siteConfig.mainNav} />
          </div>
          <div>
            <nav>
              <div>
                {process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && (
                <AuthButtonServer />
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
      </div>
    </section>
  )
}
