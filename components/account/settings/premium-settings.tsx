"use client"

import { motion } from "framer-motion"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

interface ModelInfoProps {
    userFullName: string
  }

export function PremiumSettings({ userFullName }: ModelInfoProps) {
    const supabase = createClientComponentClient()
    const [data, setData] = useState<any>()
    const [sub_id, setSub_id] = useState<any>()
    const [type, setType] = useState<any>()
    console.log(data)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        const fetchPremiumData = async () => {
            const { data, error } = await supabase
                .from('premium')
                .select('end_at, status, type, sub_id')
                .eq('user_id', userFullName);

            if (error) {
                console.error(error);
                return;
            }

            const filteredData = data.filter(item => item.type === 'sub');
            const sub_id = filteredData[0]?.sub_id
            const type = filteredData[0]?.type

            setData(filteredData);
            setSub_id(sub_id)
            setType(type)
        };
        fetchPremiumData()
    }, [])

    return (
    
    <section className='md:col-span-8 h-full w-full flex justify-center text-center relative bg-[#000] md:rounded-[2.5rem] rounded-b-[2.5rem]'>
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2}} style={{background: 'radial-gradient(100% 100% at 50% 100%,#00AA68 0%,#000 100%)'}} className='w-full h-full absolute top-0 left-0 md:rounded-[2.5rem] rounded-b-[2.5rem]'></motion.div>
    <div className='my-24 flex-col items-center text-center mx-auto flex z-10'>
    <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 2.5}} className='text-5xl mt-8 font-bold'>You are <span className='text-white'>Premium</span></motion.h1>
    <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 2.5}} className='text-lg mt-4 text-neutral-300'>Thanks to you this site is maintained every day</motion.h1>
    {data && data[0]?.end_at && (
    <motion.div className="bg-black/80 w-full h-44 mt-24 rounded-2xl p-8" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 3}}>
        <p>Your next bill will be the day</p>
        <p className="text-white text-5xl mt-4 font-bold">{new Date(data[0].end_at).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}.</p> 
    </motion.div>
    )}
    {data && sub_id && type && (
    <><button className="absolute bottom-0 mb-8 bg-black/80 hover:bg-black/50 gtransition p-4 font-medium rounded-full" onClick={onOpen}>Do you want to unsubscribe from Applio Premium?</button><Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="3xl">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Are you sure you want to cancel your Applio Premium subscription?</ModalHeader>
                                    <ModalBody>
                                        <p>
                                        Remember that when you cancel your subscription, you will immediately lose all the benefits, both on the Applio website and on the AI Hispano Discord server.
                                        </p>
                                        <p>
                                            You can buy back <strong>Applio Premium</strong> whenever you want.
                                        </p>
                                        <p>
                                        Applio guarantees that it does not store personal data such as bank or owner information. When you cancel your subscription, we will simply modify the account type in your profile.
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="danger" variant="bordered" onPress={onClose}
                                        onClick={async () => {
                                            const res: Response = await fetch('/api/cancel', {
                                            method: 'POST',
                                            body: JSON.stringify({
                                                sub_id: sub_id,
                                                type: type,
                                                user_id: userFullName
                                            }),
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                            })
                                            if (res.ok) {
                                                window.location.href = '/premium/cancel'
                                            } else {
                                                alert('An error has occurred, please contact us at discord.gg/iahispano to finalize your subscription.')
                                            }
                                        } }> 
                                            Unsubscribe
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal></>
      )}
    </div>
    </section>
    )
}