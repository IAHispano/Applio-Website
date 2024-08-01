"use client"

import { supabase } from "@/utils/database"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Avatar() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    async function getUser() {
        const {data, error} = await supabase.auth.getUser();
        if (data && data.user) {
            const userInfo = await supabase.from("profiles").select("*").eq("auth_id", data.user.id).single()
            setData(userInfo.data)
            setLoading(false)
        } else {
            setData(null)
        }

        if (error) {
            console.log(error)
            setLoading(false)
        }
    }

    async function logout() {
        const {error} = await supabase.auth.signOut();
        window.location.reload();

        if (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const openDropdown = () => {
        setIsOpen(!isOpen);
    }
    
    return (
        <section>
        {loading && (
            <button className="flex gap-4 items-center max-md:mt-12 max-md:w-full max-md:bg-white/10 max-md:p-6 max-md:rounded-2xl">
                        <img className="relative w-12 h-12 rounded-full z-50 border border-white/10" src={"/favicon.ico"} alt="user avatar"/>
                        <div className="absolute bg-white/10 rounded-full w-12 h-12 scale-125 border border-white/10"/>
                        <div className="flex flex-col text-left w-full">
                        <p className="w-full text-nowrap capitalize font-medium max-w-[100px] truncate mb-4">Loading...</p>
                        </div>
            </button>
        )}
        {!loading && (
        <header>
        {data ? (
            <button className="flex gap-4 items-center max-md:mt-12 max-md:w-full max-md:bg-white/10 max-md:p-6 max-md:rounded-xl" onClick={openDropdown}>
                        <img className="relative w-14 h-14 bg-white/10 p-1 rounded-full z-50 border border-white/10" src={data.avatar_url || "/favicon.ico"}  onError={(e) => (e.target as HTMLImageElement).src = "/favicon.ico"}  />
                        <div className="flex flex-col text-left w-full">
                        <p className="w-full text-nowrap capitalize font-medium max-w-[100px] truncate">{data.full_name}</p>
                        <p className="w-full text-nowrap text-xs text-white/80 max-w-[100px] truncate">@{data.full_name}    </p>
                        </div>
            </button>
        ) : 
            <a className="flex gap-4 items-center max-md:justify-center w-full bg-white/20 max-md:border max-md:border-white/20 max-md:bg-white max-md:text-black hover:bg-white/10 slow px-10 py-2 rounded-xl cursor-pointer" href="/login">
                <p className="max-md:text-center">Login</p>
            </a>
        }
        </header>
        )}
        {isOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="md:absolute mt-4">
                <div className="md:w-40 h-fit bg-white/10 md:bg-neutral-800 rounded-xl flex flex-col p-2 gap-1 text-white md:border border-white/10">
                    <button className="flex gap-5 hover:bg-white/10 px-4 py-2 rounded-xl slow" onClick={() => window.location.href = '/'}>             
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                        <path d="M15.0001 17C14.2006 17.6224 13.1504 18 12.0001 18C10.8499 18 9.79965 17.6224 9.00012 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M2.35151 13.2135C1.99849 10.9162 1.82198 9.76763 2.25629 8.74938C2.69059 7.73112 3.65415 7.03443 5.58126 5.64106L7.02111 4.6C9.41841 2.86667 10.6171 2 12.0001 2C13.3832 2 14.5818 2.86667 16.9791 4.6L18.419 5.64106C20.3461 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6487 13.2135L21.3477 15.1724C20.8473 18.4289 20.597 20.0572 19.4291 21.0286C18.2612 22 16.5538 22 13.1389 22H10.8613C7.44646 22 5.73903 22 4.57112 21.0286C3.40321 20.0572 3.15299 18.4289 2.65255 15.1724L2.35151 13.2135Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span>Home</span>
                    </button>
                    <button className="flex gap-5 hover:bg-white/10 px-4 py-2 rounded-xl slow" onClick={() => window.location.href = `/${data.full_name}`}>                  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                        <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span>Profile</span>
                    </button>
                    <button className="flex gap-5 hover:bg-white/10 px-4 py-2 rounded-xl slow" onClick={() => window.location.href = '/settings'}>                   
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                        <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>Settings</span>
                    </button>
                    <button className="flex gap-5 hover:bg-red-500/10 px-4 py-2 rounded-xl slow" onClick={logout}>                     
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                        <path d="M7.02331 5.5C4.59826 7.11238 3 9.86954 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 9.86954 19.4017 7.11238 16.9767 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Logout</span>
                    </button>
                </div>
            </motion.div>
        )}
        </section>
    )
}