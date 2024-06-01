export default function RvcProduct() {
    return (
        <main className="w-full h-[90svh] p-8">
            <section className="w-full h-[70svh] rounded-xl flex flex-col justify-center items-center p-4 max-md:mt-12 relative">
                <h1 className="md:text-[40svh] text-green-300/10 text-[20svh] text-center font-bold">V3</h1>
                <div className="absolute text-center md:text-[10svh] text-5xl font-semibold">
                    <p>Introducing</p>
                    <p>Applio</p>
                </div>
            </section>
            <p className="justify-center items-center mx-auto flex animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 18L12 22L16 18"/><path d="M12 2V22"/></svg>
            </p>
        </main>
    )
}