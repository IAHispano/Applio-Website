import Features from "@/components/home/features";
import Background1 from "../components/svg/background1"
import ModelsShowcase from "@/components/home/modelsShowcase";
import TestimonialsShowcase from "@/components/home/testimonialsShowcase";
import Background2 from "@/components/svg/background2";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center max-md:mx-4 md:-mt-28">
      <div className="absolute">
      <Background1 />
      </div>
      <section className="z-30 mt-72 text-center flex justify-center items-center flex-col">
      <a className="p-2 bg-white/10 border border-white/20 items-center text-black leading-none rounded-full flex lg:inline-flex hover:shadow-xl hover:shadow-white/50 slow mb-5" role="alert" href="/premium">
        <span className="flex rounded-full bg-white uppercase px-2 py-1 text-xs font-bold mr-3 font-bold">New</span>
        <span className="font-semibold mr-2 text-left flex-auto text-white">Introducing Applio Premium</span>
        <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
      </a>
      <h1 className="md:text-6xl lg:max-w-5xl max-w-xl text-3xl font-bold leading-8">Dive into a world of endless possibilities fueled by advanced AI audio technology</h1>
      <h2 className="read-font mt-6 text-white/80 max-w-lg mx-auto">Pioneering Open-Source Ecosystem Unveiling the Latest Breakthroughs in AI Voice Cloning Technologies</h2>
      <div className="mt-[37svh]">
        <div className="px-8 rounded-2xl bg-white/10 w-fit text-white border border-white/20">
          Features
        </div>
        <h3 className="text-left text-3xl font-bold mt-6">Better productivity, less costs</h3>
        <Features />
      </div>
      <div className="absolute mb-[800px]">
      <Background2 />
      </div>
      <div className="md:mt-[30svh] max-md:mt-[10svh] z-30">
      <h1 className="text-4xl font-bold">Explore the Applio AI Voices Library</h1>
      <ModelsShowcase />
      <p className="font-light text-white/90 my-8">No matter what voice you want, you can create it for free at Applio.</p>
      <a className="rounded-2xl border border-white/10 hover:bg-white/10 px-14 py-3 font-medium read-font cursor-pointer slow" href="/models">Explore now!</a>
      </div>
      <div className="md:mt-[40svh] max-md:mt-[10svh] mb-4 py-8 md:h-[80svh] w-full md:mx-24 rounded-3xl bg-gradient-to-b from-[#110F0F] to-white/[0.1] md:px-12 rounded-t-xl">
      <h1 className="text-4xl font-bold">Testimonials</h1>
      <p className="font-light text-white/90 mt-2">See what users are saying about Applio.</p>
      <TestimonialsShowcase />
      <div className="mt-12">
      <a className="bg-white rounded-2xl px-14 py-3 text-black font-medium cursor-pointer">Join Discord</a>
      <p className="text-xs font-light mt-4">🤔 Ask our community about Applio!</p>
      </div>
      </div>
      </section>
    </main>
  );
}
