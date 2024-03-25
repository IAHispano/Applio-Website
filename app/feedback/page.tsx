import SparklesCore from "@/components/landing/particles"

export default function writer() {
  return (
    <main className="w-full flex flex-col justify-start items-center min-h-screen  px-5 relative overflow-visible">
      <div
        className="absolute top-0 z-[1] h-full min-w-full opacity-30 overflow-visible"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #fff, transparent)",
        }}
      ></div>
      <section className="flex m-auto justify-center items-center text-center flex-col gap-5 max-w-6xl w-full z-[2] pb-44">
        <div className="absolute w-[1000px]  -[300px]">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="size-full"
            particleColor="#FFFFFF"
          />
        </div> 
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        We want to hear you
        </h1>
        <div className="w-full">
          <div className="flex flex-col gap-5 w-full justify-center items-center max-w-4xl mx-auto">
            <p className="text-lg max-w-[780px] text-balance w-full">
            We have created a form where you can tell us about new ideas, new projects, new features, anything you can think of! We want to improve in every possible way and without you this would be impossible.
            </p>
            <a
              className="px-4 py-2 font-bold uppercase text-sm text-black bg-white rounded-full hover:scale-110 active:scale-90 gtransition cursor-pointer z-[3] w-[500px] mb-12 mt-4"
              href="https://form.typeform.com/to/bedsT8L1"
              rel="noreferrer"
              target="_blank"
            >
              Complete the form
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
