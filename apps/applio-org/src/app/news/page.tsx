import CreatePostButton from "@/components/news/create-post";
import BlogFixed from "@/components/news/fixed";
import BlogMore from "@/components/news/news";

export default function ApiHome() {
  return (
    <main className="flex min-h-screen flex-col items-center max-md:mx-4 md:-mt-28">
      <section className="z-30 md:mt-44 max-md:mt-12 text-center flex justify-center items-center flex-col">
      <a className="p-2 bg-white/10 border border-white/20 items-center text-black leading-none rounded-full flex lg:inline-flex slow mb-5">
        <span className="font-semibold mx-2 text-left flex-auto text-white">News</span>
      </a>
      <h1 className="md:text-6xl lg:max-w-5xl max-w-xl text-4xl font-bold leading-8">Latest events</h1>
      <div className="w-full h-0.5 rounded-xl bg-white/10 m-6 mb-8"/>
      <div className="justify-end items-end mx-auto text-right w-full px-4">
      <CreatePostButton />
      </div>
      <BlogFixed />
      <BlogMore />
      </section>
    </main>
  );
}
