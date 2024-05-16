import Features from "@/components/home/features";
import Background1 from "../components/svg/background1"
import ModelsShowcase from "@/components/home/modelsShowcase";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center max-md:mx-4">
      <div className="absolute">
      <Background1 />
      </div>
      <section className="z-50 mt-28 text-center flex justify-center items-center mx-auto flex-col">
      <h1 className="text-5xl max-w-4xl font-bold">Dive into a world of endless possibilities fueled by advanced AI audio technology</h1>
      <h2 className="read-font mt-6 text-white/80 max-w-lg mx-auto">Pioneering Open-Source Ecosystem Unveiling the Latest Breakthroughs in AI Voice Cloning Technologies</h2>
      <div className="mt-[41svh]">
        <div className="px-8 rounded-2xl bg-white/10 w-fit text-white border border-white/20">
          Features
        </div>
        <h3 className="text-left text-3xl font-bold mt-6">Better productivity, less costs</h3>
        <Features />
      </div>
      <div className="mt-[30svh]">
      <h1 className="text-4xl font-bold">Explore the Applio AI Voices Library</h1>
      <ModelsShowcase />
      <p className="font-light text-white/90 my-8">No matter what voice you want, you can create it for free at Applio.</p>
      <a className="rounded-2xl border border-white/10 hover:bg-gradient-to-b hover:from-white/[.03] hover:to-[#110F0F] px-14 py-3 font-medium read-font cursor-pointer" href="/models">Explore now!</a>
      </div>
      <div className="mt-[30svh] h-[80svh] w-full mx-24 bg-gradient-to-b from-white/[0.3] to-[#110F0F] px-12 rounded-t-xl p-8">
      <h1 className="text-4xl font-bold">Testimonials</h1>
      <p className="font-light text-white/90 mt-2">See what users are saying about Applio.</p>
      <div className="mt-12">
      <a className="bg-white rounded-2xl px-8 py-2 text-black font-medium">Join Discord</a>
      <p className="text-xs font-light mt-3">🤔 Ask our community about Applio!</p>
      </div>
      </div>
      </section>
    </main>
  );
}
