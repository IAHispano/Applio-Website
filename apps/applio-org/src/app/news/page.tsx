import Background2 from "@/components/svg/background2";

export default function ApiHome() {
  return (
    <main className="flex min-h-screen flex-col items-center max-md:mx-4 md:-mt-28">
      <section className="z-30 mt-44 text-center flex justify-center items-center flex-col">
    <div className="absolute -z-1 mt-80"><Background2 /></div>
      <a className="p-2 bg-white/10 border border-white/20 items-center text-black leading-none rounded-full flex lg:inline-flex hover:shadow-xl hover:shadow-white/50 slow mb-5" role="alert" href="/premium">
        <span className="font-semibold mx-2 text-left flex-auto text-white">News</span>
      </a>
      <h1 className="md:text-6xl lg:max-w-5xl max-w-xl text-4xl font-bold leading-8 md:mb-12">Latest events</h1>
      </section>
    </main>
  );
}
