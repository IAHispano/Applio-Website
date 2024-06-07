export default function Features() {
    return (
        <section>
        <article className="grid md:grid-cols-3 gap-5 w-full h-1/5 mt-4">
            <div className="rounded-2xl bg-gradient-to-b from-white/[.03] to-[#110F0F] w-full h-full flex flex-col p-4 text-left border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                <h3 className="text-xl font-bold mt-4">Modular Codebase</h3>
                <h4 className="max-w-[350px]">Restructured codebase following a modular approach for better organization, readability, and maintenance.</h4>
            </div>
            <div className="rounded-2xl bg-gradient-to-b from-white/[.03] to-[#110F0F] w-full h-full flex flex-col p-4 text-left border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <h3 className="text-xl font-bold mt-4">Model Search</h3>
                <h4 className="max-w-[350px]">Integrated a model search feature directly into the application interface, facilitating easy model discovery.</h4>
            </div>
            <div className="rounded-2xl bg-gradient-to-b from-white/[.03] to-[#110F0F] w-full h-full flex flex-col p-4 text-left border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
                <h3 className="text-xl font-bold mt-4">Translations in 30+ Languages</h3>
                <h4 className="max-w-[350px]">Added support for translations in over 30 languages, enhancing accessibility for a global audience.</h4>
            </div>
            <div className="rounded-2xl bg-gradient-to-b from-white/[.03] to-[#110F0F] w-full h-full flex flex-col p-4 text-left border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
                <h3 className="text-xl font-bold mt-4">Cross-Platform Compatibility</h3>
                <h4 className="max-w-[350px]">Ensured seamless operation across various platforms for a consistent user experience.</h4>
            </div>
            <div className="rounded-2xl bg-gradient-to-b from-white/[.03]  to-[#110F0F] w-full h-full flex flex-col p-4 text-left border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                <h3 className="text-xl font-bold mt-4">Model Download System</h3>
                <h4 className="max-w-[350px]">Added support for downloading models from various websites such as Google Drive, Yandex, Pixeldrain, Discord, Hugging Face, or Applio.org, enhancing model accessibility.</h4>
            </div>
            <div className="rounded-2xl bg-gradient-to-b from-white/[.03] to-[#110F0F] w-full h-full flex flex-col p-4 text-left border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <h3 className="text-xl font-bold mt-4">Easy-to-Use UI</h3>
                <h4 className="max-w-[350px]">Implemented a user-friendly interface for intuitive interaction.</h4>
            </div>
        </article>
        <p className="text-center mt-8 z-50">Want to know more? <a className="underline underline-offset-2 hover:text-white/90 cursor-pointer" href="https://github.com/iahispano/applio" target="_blank">Try Applio now!</a></p>
        </section>
    );
}