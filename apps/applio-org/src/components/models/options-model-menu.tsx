import { useRouter } from "next/navigation";
import { useState } from "react"

export default function OptionsModelMenu({ id }: { id: string }) {
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleShare() {
        // CHANGE THIS TO APPLIO.ORG!
        navigator.clipboard.writeText(`https://v2.applio.org/models?id=${id}`)
    }
    return (
        <div className='md:absolute bottom-4 z-50 bg-neutral-700 p-2 drop-shadow-lg rounded-xl right-0 mx-4 max-md:mt-6 border-2 border-white/10'>
        {!open && (
            <button className="h-full p-2 w-full" onClick={handleOpen}>
               <svg className="text-center flex mx-auto justify-center " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
        )}
        {open && (
        <div className='flex max-md:flex-col md:gap-4'>
        <button className="bg-black/20 border border-white/10 hover:bg-black/10 slow px-8 py-3 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl" onClick={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>   
        <div className="max-md:mt-4 max-md:flex max-md:flex-col max-md:text-center">
            <button className="bg-black/20 border border-white/10 hover:bg-black/10 slow px-8 py-3 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl" onClick={handleShare}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            </button>
        </div>
        <div className="max-md:mt-4 max-md:flex max-md:flex-col max-md:text-center">
            <a className="bg-black/20 border border-white/10 hover:bg-black/10 slow px-8 py-3 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl">
            <svg width="24" height="24" viewBox="0 0 264 242" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M132 242L112.86 224.592C44.88 163.004 0 122.253 0 72.5341C0 31.7831 31.944 0 72.6 0C95.568 0 117.612 10.6823 132 27.4311C146.388 10.6823 168.432 0 191.4 0C232.056 0 264 31.7831 264 72.5341C264 122.253 219.12 163.004 151.14 224.592L132 242Z" fill="white"/>
            </svg>
            </a>
        </div>
        <div className="max-md:mt-4 max-md:flex max-md:flex-col max-md:text-center">
            <a className="bg-black/20 border border-white/10 hover:bg-black/10 slow px-8 py-3 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
            </a>
        </div>
        <div className="max-md:mt-4 max-md:flex max-md:flex-col max-md:text-center">
            <a className="text-black bg-white hover:bg-white/80 slow px-8 py-3 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl">
            <p className="md:hidden block font-semibold ">Download</p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:block hidden"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </a>
        </div>
        </div>
        )}
    </div>
    )
}