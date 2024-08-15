"use client"

import { useEffect, useState } from "react"
import { Divider, Spinner } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { motion } from "framer-motion"

import { Database } from "@/app/types/database"

export const runtime = "edge"

export default function DownloadModel({ params }: { params: { id: string } }) {
  const { id } = params
  const [data, setData] = useState<any | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const supabase = createClientComponentClient<Database>()

  const fetchData = async () => {
    try {
      const { data: modelsData, error: modelsError } = await supabase
        .from("models")
        .select("*")
        .eq("id", id)
        .limit(1)
        .single()

      if (modelsError) {
        console.error("Error al consultar modelos:", modelsError)
        setError(modelsError as PostgrestError)
      } else {
        setData(modelsData)
        setLoading(false)

        if (data) {
          try {
            const { data: userData, error: userError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", data.author_id)
              .single()

            if (userError) {
              setError(userError)
              return
            }

            if (Array.isArray(userData)) {
              setUser(userData[0])
            }
          } catch (error) {
            console.error("Error al consultar el perfil del autor:", error)
          }
        }
      }
    } catch (error) {
      console.error("Error al consultar modelos:", error)
      setError(error as PostgrestError)
    }
  }

  async function getUserAndUpdateHistory() {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError) {
        console.error("Error fetching user data:", userError)
        return
      }

      const { data: userProfile, error: profileError } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("auth_id", userData.user.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        return
      }

      const historyInsert = {
        see_by: userProfile.full_name,
        model: id,
      }

      const { error: historyError } = await supabase
        .from("downloads")
        .insert(historyInsert)

      if (historyError) {
        console.error("Error inserting into history:", historyError)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    if (loading === false) {
      getUserAndUpdateHistory()
    }
  }, [loading])

  if (error) {
    return (
      <div className="container flex flex-col justify-center items-center h-screen pb-24 mx-auto text-center max-w-7xl">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
          This model does{" "}
          <span className="bg-gradient-radial-red text-transparent bg-clip-text">
            not exist
          </span>
          .
        </h1>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container flex flex-col justify-center items-center h-screen pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
        <Spinner color="success" />
      </div>
    )
  }

  const formatDate = (dateStr: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return new Date(dateStr).toLocaleDateString(undefined, options)
  }

  function copyUrl(link: any) {
    navigator.clipboard.writeText(link)
  }

  return (
    <main className="container flex flex-col justify-center items-center pb-8 pt-6 gap-5 md:py-10 mx-auto text-center max-w-7xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 h-full min-w-full overflow-hidden blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 40% 30% at 50% 0%, #00AA68, transparent)",
        }}
      ></motion.div>
      {data.image_url && (
        <div className="overflow-hidden w-full max-w-md md:hover:scale-105 md:active:scale-150 md:active:z-50 rounded-2xl relative shadow-2xl mb-5 gtransition">
          <img
            src={data.image_url || "/no_bg_applio_logo.png"}
            alt="Model image"
            onError={(e) => (e.currentTarget.src = "/no_bg_applio_logo.png")}
          />
        </div>
      )}
      <h1 className="text-6xl font-bold leading-tight tracking-tighter md:text-6xl max-w-4xl truncate my-4">
        {data.name}
      </h1>
      <div>
        <div className="flex justify-between items-center flex-wrap gap-5 w-full">
          <div className="flex flex-col text-left gap-1 grow">
            <p className="text-sm md:text-lg tracking-tight text-neutral-400 text-left">
              Uploaded at {formatDate(data.created_at)}
            </p>
          </div>
          <p className="text-sm md:text-lg tracking-tight text-neutral-400 text-left">
            Created by {data.author_username}
          </p>
        </div>
        <Divider className="w-full my-1" />
        <div className="grid grid-cols-4 gap-4 mt-12">
          <div className="col-span-2 p-3 w-full rounded-xl bg-white/10 text-center text-xs max-w-xl select-text">
            {data.link}
          </div>
          <button
            className="col-span-1 p-3 w-full rounded-xl bg-white/10 hover:bg-white/30 gtransition text-center text-2xl z-50 cursor-pointer"
            onClick={() => copyUrl(data.link)}
          >
            Copy Link
          </button>
          <a
            href={data.link}
            className="col-span-1 p-3 w-full rounded-xl bg-white/10 hover:bg-white/30 gtransition text-center text-2xl z-50 cursor-pointer"
          >
            Download
          </a>
        </div>
      </div>
    </main>
  )
}
