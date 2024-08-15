import React, { useEffect, useState } from "react"
import { Spinner } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { Plus } from "lucide-react"

import { Database } from "@/app/types/database"

export default function BlogCard() {
  const supabase = createClientComponentClient<Database>()
  const [data, setData] = useState<any[] | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const {
        data: { session },
        error: sessionError,
      }: { data: any; error: any } = await supabase.auth.getSession()
      const { data: userData, error: userError } = await supabase
        .from("blog")
        .select("*")
        .order("created_at", { ascending: false })

      if (userError) {
        setError(userError)
        return
      }

      if (session) {
        const { data: roleData, error: roleError }: { data: any; error: any } =
          await supabase
            .from("profiles")
            .select("role, full_name")
            .eq("auth_id", session.user.id)

        if (roleError) {
          setError(roleError)
          return
        }

        if (roleData[0].role === "admin") {
          setAdmin(true)
        }
      }

      setData(userData)
      setLoading(false)
    }

    fetchData()
  }, [])

  const formatDate = (dateStr: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return new Date(dateStr).toLocaleDateString(undefined, options)
  }

  return (
    <>
      {loading === false && (
        <div className="flex flex-col gap-6">
          {isAdmin === true && (
            <a
              className="flex items-center justify-center mx-auto gap-2 bg-white/90 text-black hover:bg-white active:opacity-50 font-medium max-md:text-sm py-2 px-4 rounded-full gtransition cursor-pointer"
              href="/blog/create"
            >
              New Blog
              <span className="text-lg md:text-xl rotate-180 gtransition">
                <Plus />
              </span>
            </a>
          )}
          <h1 className="md:text-7xl text-4xl font-bold mb-4 dark:text-white text-black">
            Latest news
          </h1>
        </div>
      )}
      <div className="flex flex-col gap-4 w-full mt-8">
        {loading ? (
          <Spinner color="success" />
        ) : (
          data &&
          data.map((item, index) => (
            <div className={`w-full `} key={item.id}>
              <a
                href={`/blog/${item.id}`}
                className="bg-black rounded-xl flex flex-col md:flex-row gap-5 h-full md:w-[800px] w-full md:[&_img]:hover:opacity-70  md:active:scale-95 gtransition relative overflow-hidden border border-white/30"
              >
                <div className="flex-grow flex flex-col justify-center items-start p-10 z-10">
                  <img
                    className="z-10 saturate-150 absolute top-0 left-0 w-full h-full object-cover object-center opacity-30 dark:opacity-50 blur scale-110 gtransition ltransition"
                    src={item.image_url}
                    alt={item.title}
                  />
                  <p className="text-xl md:text-3xl font-bold tracking-tight text-left z-30">
                    {item.title}
                  </p>
                  <p className="text-sm md:text-lg text-neutral-300 text-left z-30">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </>
  )
}
