import Avatar from "./avatar";
import NavbarMobile from "./navbarMobile";

export default function Navbar() {
    return (
        <header className="sticky top-0 inset-x-0 z-50">
            <div className="max-lg:hidden bg-white/[3%] backdrop-blur-lg md:w-[80%] md:h-[8svh] max-md:h-svh rounded-b-xl border border-white/10 flex max-md:flex-col md:justify-center md:items-center mx-auto max-md:p-4 max-md:bg-neutral-800/80 max-md:rounded-t-3xl">
                <div className="flex md:flex-cols-3 max-md:flex-col md:px-16 px-2 w-full">
                <a className="text-3xl font-semibold tracking-tight my-0.5 hover:bg-white/10 slow px-4 rounded-xl" href="/">Applio</a>
                <div className="flex max-md:flex-col gap-6 w-full py-2 items-center justify-start md:ml-12 mb-1 max-md:mt-4">
                    <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full">Pricing</a>
                    <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full">Explore</a>
                    <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full">Products</a>
                    <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full">About us</a>
                </div>
                <Avatar />
                </div>
            </div>
            <div className="lg:hidden">
            <NavbarMobile />
            </div>
        </header>
    )
}