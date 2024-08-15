"use client"

import React, { useEffect, useState } from "react"
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"

import "@/styles/text-animation.css"

import { Progress, Select, SelectItem } from "@nextui-org/react"

interface ModelInfoProps {
  auth_id: string
}

function ApiLogs({ auth_id }: ModelInfoProps) {
  const [userTokens, setUserTokens] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [value, setValue] = React.useState("")
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [usage, setUsage] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

  const fetchUserTokens = async () => {
    const supabase = createClientComponentClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session?.user.id) {
      const { data } = await supabase
        .from("tokens")
        .select("*")
        .eq("user", session.user.id)

      setUserTokens(data || [])
      setLoading(false)
    } else {
      console.error("Error: User ID is undefined.")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserTokens()
    }

    fetchData()
  }, [])

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedToken = e.target.value
    setSelectedToken(selectedToken)
    fetchTokenUsage(selectedToken)
  }

  const fetchTokenUsage = async (selectedToken: string) => {
    const supabase = createClientComponentClient()
    const { data } = await supabase
      .from("tokens")
      .select("*")
      .eq("token", selectedToken)

    setUsage(data?.[0]?.usage)
    setDate(data?.[0]?.created_at)
    setRole(data?.[0]?.role)
  }

  return (
    <div className="max-w-6xl w-full flex flex-col gap-5 md:gap-10 justify-center items-center text-left py-5">
      <section className="grid grid-cols-1 md:grid-cols-8 w-full grid-rows-1 gap-4 gtransition">
        <article className="md:col-span-8 overflow-hidden md:h-80 relative md:hover:rounded-[2rem] gtransition w-full h-full p-5 gap-4 flex flex-col rounded-3xl border-2 border-white/20 bg-black justify-start items-start relative">
          <div className="h-full flex flex-col justify-center items-center bg-black w-full p-10 absolute overflow-hidden blur-lg scale-110 -ml-5 -mt-5 filter brightness-75">
            <img
              className="absolute top-0 left-0 pointer-events-none w-full h-full object-cover opacity-70 bg-green-500"
              src="/poster.png"
              alt="api poster"
            ></img>
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-4 w-full h-full z-[2] p-5">
            <h2 className="text-5xl md:text-6xl md:hover:text-8xl font-bold tracking-tighter gtransition">
              Applio API
            </h2>
            <p className="text-shadow:0 0 20px black, 0 0 40px black, 0 0 70px black;text-wrap:balance">
              Create, experiment and develop; now free, fast and public.
            </p>
          </div>
        </article>
        {userTokens.length === 0 ? (
          <article className="md:col-span-8 w-full h-full p-5 gap-4 flex flex-col justify-center items-center relative">
            <p className="font-semibold text-2xl text-neutral-500 z-10">
              You don&apos;t have any keys yet.
            </p>
          </article>
        ) : (
          <article className="md:col-span-8 overflow-hidden relative gtransition w-full h-full gap-4 flex flex-col justify-start items-start relative">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                label="Select one of your keys"
                className="max-w-full"
                variant="bordered"
                onChange={handleSelectionChange}
                selectedKeys={value}
                size="lg"
              >
                {userTokens.map((token) => (
                  <SelectItem key={token.token} value={token.token}>
                    {token.token}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </article>
        )}
        {selectedToken ? (
          <>
            <article
              className="md:col-span-3 w-full h-full p-5 gap-4 flex flex-col rounded-3xl undefined  border-2 border-white/20 bg-black justify-start items-start relative"
              style={{
                boxShadow: "rgba(255, 255, 255, 0.5) 0px 0px 60px -30px",
              }}
            >
              <h2 className="font-semibold text-2xl z-10">Use</h2>
              <section className="w-full flex flex-col gap-4 rounded-lg overflow-y-auto">
                <section className="undefined w-full flex flex-col gap-4 rounded-lg overflow-y-auto">
                  <div className="undefined h-full flex flex-col items-start justify-start text-left">
                    <p className="text-sm uppercase w-full font-bold">
                      Requests
                    </p>
                    <h2 className="font-medium tracking-tight text-2xl w-full">
                      {usage}
                    </h2>
                    <div className="w-full mt-4 overflow-hidden ">
                      <Progress
                        aria-label="Loading..."
                        value={Number(usage)}
                        className="max-w-full"
                        size="lg"
                      />
                    </div>
                  </div>
                </section>
              </section>
            </article>
            <article
              className="md:col-span-5 w-full h-full p-5 gap-4 flex flex-col rounded-3xl undefined  border-2 border-white/20 bg-black justify-start items-start relative"
              style={{
                boxShadow: "rgba(255, 255, 255, 0.5) 0px 0px 60px -30px",
              }}
            >
              <h2 className="font-semibold text-2xl z-10">Key information</h2>
              <section className="w-full flex flex-col gap-4 rounded-lg overflow-y-auto">
                <section className="undefined w-full flex flex-col gap-4 rounded-lg overflow-y-auto">
                  <div className="undefined h-full flex flex-col items-start justify-start text-left">
                    <p className="text-sm uppercase w-full font-bold">
                      Created at
                    </p>
                    <h2 className="font-medium tracking-tight text-2xl w-full">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </h2>
                  </div>
                  <div className="undefined h-full flex flex-col items-start justify-start text-left">
                    <p className="text-sm uppercase w-full font-bold">Role</p>
                    <h2 className="font-medium tracking-tight text-2xl w-full capitalize">
                      {role}
                    </h2>
                  </div>
                </section>
              </section>
            </article>
          </>
        ) : null}
      </section>
    </div>
  )
}
export default ApiLogs
