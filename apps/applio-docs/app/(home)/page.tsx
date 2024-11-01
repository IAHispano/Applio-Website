export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center mb-44"> 
     	<section className="w-full h-full rounded-xl flex flex-col justify-center items-center p-4 relative"> 
				<h1 className="md:text-[40svh] text-green-300 dark:text-green-300/10 text-[20svh] text-center font-bold">
					V3
				</h1>
				<div className="absolute text-center md:text-[10svh] text-5xl font-semibold">
					<p>Applio</p>
				</div>
			</section>
      <div className="flex max-md:flex-col gap-6 items-center justify-center">
      <button type="button" className="rounded-xl bg-black text-white dark:bg-white border border-white/10 hover:shadow-xl hover:shadow-white/10 slow dark:text-black w-fit px-6 py-2 text-sm">Download for Windows</button>
      <button type="button" className="rounded-xl border border-black dark:border-white/10 hover:shadow-xl hover:shadow-white/10 w-fit px-6 py-2 slow text-sm">Download for macOS/Linux</button>
      </div>
      <p className="text-xs text-neutral-400 mt-4">This project is <a className="underline hover:text-neutral-200 slow" href="https://github.com/iahispano/applio" target="_blank" rel="noreferrer">open source on github</a>, you can participate too!</p>
    </main>
  );
}
