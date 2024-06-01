import Background2 from "@/components/svg/background2";
import CodeSample from "@/components/svg/code-sample";

export default function ApiHome() {
  return (
    <main className="flex min-h-screen flex-col items-center max-md:mx-4 md:-mt-28">
      <section className="z-30 mt-44 text-center flex justify-center items-center flex-col">
    <div className="absolute -z-1"><Background2 /></div>
      <a className="p-2 bg-white/10 border border-white/20 items-center text-black leading-none rounded-full flex lg:inline-flex hover:shadow-xl hover:shadow-white/50 slow mb-5" role="alert" href="/premium">
        <span className="font-semibold mx-2 text-left flex-auto text-white">Developers</span>
      </a>
      <h1 className="md:text-6xl lg:max-w-5xl max-w-xl text-4xl font-bold leading-8 md:mb-12">Build with the Applio API</h1>
      <CodeSample />
      <div className="mt-12 z-50">
      <a className="bg-white rounded-2xl px-14 py-3 text-black font-medium cursor-pointer hover:bg-white/80 slow" href="/products/api/dashboard">Get Started</a>
      <p className="text-sm text-white/60 font-light mt-4">Start now, totally free! 🎉</p>
      </div>
      </section>
    </main>
  );
}
