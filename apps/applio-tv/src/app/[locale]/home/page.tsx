import { useLocale } from "next-intl";

export default function HomeWithOutLogin() {
    const locale = useLocale()
    return (
        <main className="md:py-4 max-md:my-4 px-6 w-full h-full gap-6 flex-col flex">
            <section className="bg-white/10 w-full md:h-[97vh] h-full rounded-xl flex max-md:flex-col">
                <div className="flex md:flex-cols-2 max-md:flex-col md:justify-between gap-4 p-8">
                    <div className="grid md:grid-cols-5 grid-cols-3 md:w-full w-full md:h-full md:h-[85svh] max-md:h-[60svh] gap-2">
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
            <section className="relative w-full h-[97vh] rounded-xl flex">
            <div className="flex md:flex-cols-2 max-md:flex-col md:justify-between gap-4 py-4">
                    <div className="flex flex-col justify-start items-start gap-4">
                        <h1 className="text-3xl md:text-7xl font-bold tracking-tight text-white md:text-left text-center ">Upload your video</h1>
                        <h2 className="md:text-lg max-w-sm text-white md:text-left px-0.5">Just copy the URL of your video, make sure it has no copyrighted content and upload it to Applio TV!</h2>
                    </div>
                    <div className="grid md:w-full w-full md:h-full h-[85svh] gap-2">
                        <article className="relative md:col-span-3 col-span-2 w-full h-full rounded-2xl bg-white/20 overflow-hidden">
                            <p className="absolute bottom-0 right-0 text-8xl p-6 font-bold">1</p>
                            <img src="/login1.png" className="object-fill w-full h-full" />
                        </article>
                    </div>
            </div>
            </section> 
            <section className="relative w-[100%] h-[97vh] rounded-xl flex">
            <div className="flex md:flex-cols-2 max-md:flex-col md:justify-between gap-4 py-4 w-full">
                    <div className="grid md:w-full w-full md:h-full h-[85svh] gap-2">
                        <article className="relative md:col-span-3 col-span-2 w-full h-full rounded-2xl bg-white/20 overflow-hidden">
                            <p className="absolute top-0 left-0 text-8xl p-6 font-bold">2</p>
                            <img src="/login4.png" className="object-fill w-full h-full" />
                        </article>
                    </div>
                    <div className="flex flex-col justify-end items-end gap-4">
                        <h1 className="text-3xl md:text-7xl font-bold tracking-tight text-white md:text-right text-center">Select some tags</h1>
                        <h2 className="md:text-lg max-w-md text-white md:text-right text-balance">Have you seen how simple it is? After uploading your video you will be able to select some tags such as the subject of the video, the voice model used or the key moment of the video. Remember! You must place these tags correctly, so we can recommend your videos to more people!</h2>
                    </div>
            </div>
            </section> 
            <section className="relative w-[100%] h-[97vh] rounded-xl flex">
            <div className="flex md:flex-cols-2 max-md:flex-col md:justify-between gap-4 py-4 w-full">
                    <div className="flex flex-col justify-start items-start gap-4">
                        <h1 className="text-3xl md:text-7xl font-bold tracking-tight text-white md:text-left text-center">Get thousands of visitors</h1>
                        <h2 className="md:text-lg max-w-md text-white md:text-left ">We will recommend your videos to other AI lovers based on their history and the tags you have previously chosen. It is important that if you have made a mistake by selecting certain tags you edit your video and fix it. During the next weeks you will see how your video is getting more and more visits from lovers like you. Maybe they will leave you some comments about some improvements you could make, stay tuned you can create a great community from your videos with AI!</h2>
                    </div>
                    <div className="grid grid-cols-2 md:w-full w-full md:h-full h-[85svh] gap-2 ml-12">
                        <article className="relative w-full h-full rounded-2xl bg-white/20 overflow-hidden">
                            <img src="/login2.png" className="object-fill w-full h-full" />
                        </article>
                        <article className="relative w-full h-full rounded-2xl bg-white/20 overflow-hidden">
                            <p className="absolute bottom-0 right-0 text-8xl p-6 font-bold">3</p>
                            <img src="/login3.png" className="object-fill w-full h-full" />
                        </article>
                    </div>
            </div>
            </section> 
        </main>
    );
}
