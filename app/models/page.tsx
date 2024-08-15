"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Counter from "@/components/models/counter"
import ModelsData from "@/components/models/models"

export const runtime = "edge"

export default function Models() {
  const [count, setCount] = useState<number>(0)
  const [data, setData] = useState<any[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchData = async () => {
      const { error, count } = await supabase
        .from("models")
        .select("author_username", { count: "exact", head: true })

      if (error) {
        console.error(error)
      } else {
        setCount(count as number)
      }
    }

    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from("models")
        .select("*")
        .range(0, 10)
        .order("likes", { ascending: false })

      if (error) {
        console.error(error)
      } else {
        setData(data)
      }
    }

    fetchData()
    fetchFeatured()
  }, [])

  return (
    <main className="flex items-center w-full h-full flex-col overflow-visible max-md:px-4">
      <div
        className="w-full h-full fixed top-0 left-0"
        style={{
          background:
            "radial-gradient(100% 100% at 50% 0%,#00AA68 0%,#09090b 80%)",
        }}
      ></div>
      <div className="flex-col justify-center items-center text-center w-full md:min-h-[90svh] px-5 pb-[500px] flex relative overflow-hidden md:min-w-[110rem] md:max-w-[110rem] mx-auto">
        <div className="my-12">
          <div className="pt-12">
            <div className="flex flex-col max-w-[100rem]">
              {data.length > 0 && (
                <p className="md:text-3xl textl-xl font-bold md:text-left text-center">
                  Explore <Counter value={Number(count)} /> models
                </p>
              )}
              <ModelsData />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
