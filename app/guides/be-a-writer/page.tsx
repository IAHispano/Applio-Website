import SparklesCore from "@/components/landing/particles";

export default function writer() {
  return (
    <main className="w-full flex flex-col justify-start items-center min-h-screen  px-5 relative overflow-hidden">
        <div className="absolute top-0 z-[1] h-full min-w-full opacity-30 overflow-hidden" style={{ backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #fff, transparent)' }}></div>
        <section className="pt-40 flex justify-center items-center text-center flex-col gap-5 max-w-6xl w-full z-[2]">
            <div className="absolute w-[1000px]  h-[300px]">
                <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#FFFFFF"
                />
            </div>
            <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
            Help the community, just by writing
            </h1>
            <div className="w-full">
                <div className="flex flex-col gap-5 w-full justify-center items-center max-w-4xl text-center mx-auto">
                    <p className="text-lg">Make guides and solve community problems, fast, simple and with markdown text.</p>
                    <a className="px-4 py-2 font-bold uppercase text-sm text-black bg-white rounded-full hover:scale-110 active:scale-90 gtransition cursor-pointer z-[3]" href="https://dtzv2n48s82.typeform.com/to/m264jCzL" rel="noreferrer" target="_blank">Request access</a>
                </div>
            </div>
        </section>
    </main>
  )
}