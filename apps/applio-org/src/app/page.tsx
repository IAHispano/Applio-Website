import Features from "@/components/home/features";
import TestimonialsShowcase from "@/components/home/testimonialsShowcase";
import Background1 from "../components/svg/background1";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center md:-mt-28 w-full">
      <div className="absolute overflow-visible">
        <Background1 />
      </div>
      <section className="z-30 md:mt-96 max-md:mt-24 text-center flex justify-center items-center flex-col w-full">
        <h1 className="text-3xl sm:text-3xl lg:text-6xl lg:max-w-5xl max-w-xl font-bold leading-tight sm:leading-snug md:leading-normal max-xl:px-12">
          Dive into a world of endless possibilities fueled by advanced AI audio
          technology
        </h1>
        <h2 className="mt-5 text-white/80 max-w-lg mx-auto px-12">
          Pioneering Open-Source Ecosystem Unveiling the Latest Breakthroughs in
          AI Voice Cloning Technologies
        </h2>
        <a
          className="bg-white rounded-xl px-14 py-2 mt-5 text-black font-medium cursor-pointer hover:bg-white/80 slow"
          href="/products/applio"
        >
          See more
        </a>
        <div className="mt-[32svh] z-50 px-12 ">
          <div className="px-8 rounded-2xl bg-white/10 w-fit text-white border border-white/20">
            Features
          </div>
          <h3 className="text-left text-3xl font-bold mt-6">
            Better productivity, less costs
          </h3>
          <Features />
        </div>

        <div className="w-full bg-gradient-to-b from-transparent via-white/[0.1] to-transparent">
          <div className="md:mt-[20svh] max-md:mt-[10svh] mb-4 py-8 md:h-[90svh] max-md:p-4 px-12">
            <h1 className="text-4xl font-bold">Testimonials</h1>
            <p className="font-light text-white/90 mt-2">
              See what users are saying about Applio.
            </p>
            <TestimonialsShowcase />
            <div className="mt-8">
              <a
                className="bg-white rounded-xl px-14 py-3 text-black font-medium cursor-pointer hover:bg-white/80 slow"
                href="https://discord.gg/WxfMrF6S"
                target="_blank"
                rel="noreferrer"
              >
                Join Discord
              </a>
              <p className="text-xs font-light mt-4">
                🤔 Ask our community about Applio!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
