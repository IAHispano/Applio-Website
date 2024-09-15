export default function Features() {
    return (
        <section>
            <div className="grid md:grid-cols-3 gap-5 w-full mt-4 max-w-5xl">
                {features.map((feature, index) => (
                    <div key={index} className="rounded-2xl bg-white/[0.03] backdrop-blur-3xl flex flex-col p-4 text-left border border-white/10">{feature.icon}
                        <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
                        <p className="text-sm mt-2">{feature.description}</p>
                    </div>
                ))}
            </div>
            <p className="text-center mt-8">🕵️‍♂️ Want to know more? <a className="underline hover:text-white/90 cursor-pointer" href="products/rvc">Try Applio now!</a></p>
        </section>
    );
}

const features = [
    {
        title: "Modular Codebase",
        description: "Applio&apos;s modular codebase improves readability, maintenance, and organization.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
        )
    },
    {
        title: "Advanced Model Search",
        description: "Easily discover and explore models within the application.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
        )
    },
    {
        title: "Extensive Language Support",
        description: "Supports translations in 30+ languages for global accessibility.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
            </svg>
        )
    },
    {
        title: "Cross-Platform Compatibility",
        description: "Works consistently across desktop, tablet, and mobile devices.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
            </svg>
        )
    },
    {
        title: "Comprehensive Model Download System",
        description: "Supports downloading models from various sources like Google Drive, Yandex, Pixeldrain, Discord, Hugging Face and Applio!",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
        )
    },
    {
        title: "User-Friendly Interface",
        description: "An intuitive and easy-to-use interface for all users.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
        )
    }
];
