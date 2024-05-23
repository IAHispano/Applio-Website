import Avatar from "./avatar";
import NavbarMobile from "./navbarMobile";

export default function Navbar() {
    return (
        <header className="sticky top-0 inset-x-0 z-50">
            <div className="max-lg:hidden bg-white/[3%] backdrop-blur-lg md:w-[70%] md:h-[8svh] max-md:h-svh rounded-b-xl border border-white/10 flex max-md:flex-col md:justify-center md:items-center mx-auto max-md:p-4 max-md:bg-neutral-800/80 max-md:rounded-t-3xl">
                <div className="flex md:flex-cols-3 max-md:flex-col md:px-16 px-2 w-full">
                <a className="text-3xl font-semibold tracking-tight my-0.5 hover:bg-white/10 slow px-4 rounded-xl" href="/">Applio</a>
                <div className="flex max-md:flex-col gap-6 w-full py-2 items-center justify-start md:ml-12 mb-1 max-md:mt-4">
                    <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full" href="/premium">Pricing</a>
                    <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full" href="/models">Explore</a>
                    <div className="dropdown">
                        <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full flex items-center transition">Products<svg className="ml-2 mt-0.5" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3333 1L5.66667 5.66667L1 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                        <div className="dropdown-menu hidden absolute bg-[#2f2e31] backdrop-blur-lg border border-white/10 rounded-xl text-white w-[60svh] p-4 shadow-xl mt-0.5">
                            <div className="grid grid-cols-3 w-full divide-x divide-white/20 items-start text-left">
                                <div className="col-span-1 flex flex-col gap-2 w-full p-2">
                                    <p className="text-left text-white/70 px-1.5">Voice cloning</p>
                                    <a className="hover:bg-white/10 rounded-lg cursor-pointer p-2" href="https://github.com/IAHispano/Applio/releases" target="_blank">
                                        <h1 className="font-bold text-lg">Applio RVC</h1>
                                        <p className="text-xs">VITS-based Voice Conversion focused on simplicity, quality and performance</p>
                                    </a>
                                    <a className="hover:bg-white/10 rounded-lg p-2 cursor-pointer" href="/app">
                                        <h1 className="font-bold text-lg">Applio APP</h1>
                                        <p className="text-xs">Our next voice conversion client, designed for beginners.</p>
                                    </a>
                                    <a className="hover:bg-white/10 rounded-lg p-2 cursor-pointer" href="/playground">
                                        <h1 className="font-bold text-lg">Playground</h1>
                                        <p className="text-xs">Want to try Applio? Click here to access a reduced version to test Applio before installing it on your computer.</p>
                                    </a>
                                </div>
                                <div className="col-span-1 flex flex-col gap-2 w-full p-2">
                                    <p className="text-left text-white/70 px-1.5">Applio ecosystem</p>
                                    <a className="hover:bg-white/10 rounded-lg cursor-pointer p-2" href="https://docs.applio.org" target="_blank">
                                        <h1 className="font-bold text-lg">Applio Docs</h1>
                                        <p className="text-xs">Here you will learn how to use Applio.</p>
                                    </a>
                                    <a className="hover:bg-white/10 rounded-lg cursor-pointer p-2" href="/bot">
                                        <h1 className="font-bold text-lg">Applio BOT</h1>
                                        <p className="text-xs">Applio-Bot is an all-in-one solution to simplify various tasks in Discord. Automate responses, moderate your chat or efficiently manage your community, with unique functions powered by AI.</p>
                                    </a>
                                    <a className="hover:bg-white/10 rounded-lg p-2 cursor-pointer" href="https://github.com/IAHispano/Applio-plugins" target="_blank">
                                        <h1 className="font-bold text-lg">Applio Plugins</h1>
                                        <p className="text-xs">Collection of the best Applio plugins.</p>
                                    </a>
                                </div>
                                <div className="col-span-1 flex flex-col gap-2 w-full p-2">
                                    <p className="text-left text-white/70 px-1.5">For developers</p>
                                    <a className="hover:bg-white/10 rounded-lg cursor-pointer p-2" href="/api">
                                        <h1 className="font-bold text-lg">Applio API</h1>
                                        <p className="text-xs">Robust functionality, focused on granting convenient access to AI models developed using the RVC technology.</p>
                                    </a>
                                    <a className="hover:bg-white/10 rounded-lg cursor-pointer p-2" href="https://github.com/blaise-tk/rvc_cli" target="_blank">
                                        <h1 className="font-bold text-lg">RVC CLI</h1>
                                        <p className="text-xs">RVC CLI enables seamless interaction with Retrieval-based Voice Conversion through commands or HTTP requests.</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full flex items-center transition">About us<svg className="ml-2 mt-0.5" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3333 1L5.66667 5.66667L1 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                        <div className="dropdown-menu hidden absolute bg-[#2f2e31] border border-white/10 rounded-xl text-white w-[60svh] p-4 shadow-xl mt-0.5">
                            <div className="grid grid-cols-2 w-full divide-x divide-white/20 items-start text-left">
                                <div className="col-span-1 flex flex-col gap-2 w-full p-2">
                                    <p className="text-left text-white/70 px-1.5">Team</p>
                                    <a className="hover:bg-white/10 rounded-lg cursor-pointer p-2" href="/team">
                                        <h1 className="font-bold text-lg">Team</h1>
                                        <p className="text-xs">Meet all the engineers, managers or collaborators who have worked on one of our projects.</p>
                                    </a>
                                    <a className="hover:bg-white/10 rounded-lg p-2 cursor-pointer" href="/join-team">
                                        <h1 className="font-bold text-lg">Join the team</h1>
                                        <p className="text-xs">If you think you have the qualities to be part of our team here you can find out how to do it. </p>
                                    </a>
                                </div>
                                <div className="col-span-1 flex flex-col gap-2 w-full p-2">
                                    <p className="text-left text-white/70 px-1.5">What is Applio?</p>
                                    <a className="hover:bg-white/10 rounded-lg cursor-pointer p-2" href="/history">
                                        <h1 className="font-bold text-lg">History</h1>
                                        <p className="text-xs">Find out how Applio started and how it is progressing during its history.</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
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