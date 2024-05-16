import { useLocale } from "next-intl";

export default function HomeWithOutLogin() {
    const locale = useLocale()
    return (
        <main className="py-4 px-6 w-full h-full gap-6 flex-col flex">
            <section className="bg-white/10 w-full md:h-[97vh] h-fit rounded-xl flex max-md:flex-col">
                <div className="flex md:flex-cols-2 max-md:flex-col md:justify-between gap-4 p-8">
                    <div className="grid md:grid-cols-5 grid-cols-3 md:w-full w-full md:h-full h-[85svh] gap-2">
                        <article className="md:col-span-3 col-span-2 w-full h-full rounded-xl bg-white/20 overflow-hidden">
                            <img src="/login1.png" className="object-fill  w-full h-full" />
                        </article>
                        <article className="md:col-span-2 col-span-1 w-full h-full rounded-xl bg-white/20 overflow-hidden">
                            <img src="/login3.png" className="object-fill w-full h-full" />
                        </article>
                        <article className="md:col-span-2 col-span-1 w-full h-full rounded-xl bg-white/20 overflow-hidden">
                            <img src="/login2.png" className="object-fill  w-full h-full" />
                        </article>
                        <article className="md:col-span-3 col-span-2 w-full h-full rounded-xl bg-white/20 overflow-hidden">
                            <img src="/login4.png" className="object-fill  w-full h-full" />
                        </article>
                    </div>
                    <div className="flex flex-col justify-start items-end gap-4">
                        <h1 className="text-3xl md:text-7xl font-bold tracking-tight text-white md:text-right text-center md:max-w-[1400px]">Share your <span className="underline decoration-3 underline-offset-4">AI</span> created videos all over the world</h1>
                    </div>
                </div>
                <div className="md:absolute bottom-12 md:right-0 md:w-1/4 p-8 flex flex-col gap-4 md:mr-6">
                    <a href={`/${locale}/login`} className="hover:bg-white/30 cursor-pointer bg-white/10 w-full text-center rounded-lg py-3">Login</a>
                    <a className="hover:underline hover:bg-white/30 cursor-pointer bg-white/10 w-full text-center rounded-lg py-2">Read more</a>

                </div>

            </section>
            {/* <section className="relative bg-white/10 w-full h-[97vh] rounded-xl flex">

            </section> */}
        </main>
    );
}
