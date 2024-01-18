"use client"

import { useEffect, useState } from "react"
import { Divider, Progress, Spinner } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { Info } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Database } from "@/app/types/database"

const supabase = createClientComponentClient<Database>()

interface NotificationsProps {
  userFullName: string | null
}

export function Notifications(props: NotificationsProps) {
  const [data, setData] = useState<any[] | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [posts, setPosts] = useState<any[] | null>(null)

  async function fetchData() {
    if (props.userFullName) {
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("full_name, id, role")
        .eq("full_name", props.userFullName)

      if (userError) {
        setError(userError)
        return
      }
      setUser(userData[0])
      if (userData && userData.length > 0) {
        const { data: fetchedData, error } = await supabase
          .from("alerts")
          .select("*")
          .order("created_at", { ascending: false })
          .eq("for", userData[0].role)

        if (error) {
          setError(error)
        } else {
          setData(fetchedData)
          setPosts(fetchedData)
        }
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Progress
          isIndeterminate
          aria-label="Loading..."
          className="max-w-xs md:max-w-md "
          color="success"
          size="sm"
        />
      </div>
    )
  }

  return (
    <div className="flex-grow bg-neutral-900 h-[800px] p-5 w-4/5 mx-auto my-11 gap-5 flex flex-col rounded-3xl overflow-y-auto active:scale-110 active:my-14 gtransition">
      <h2 className="text-4xl font-bold tracking-tight text-white">
        Hey{" "}
        <span className="underline decoration-2 underline-offset-4 decoration-green-500 select-all md:hover:tracking-wide gtransition-low font-semibold">
          {props.userFullName}
        </span>
        , you currently have{" "}
        <span className="font-semibold">{data.length}</span> notifications:
        <Divider className="mt-4" />
      </h2>
      <section className="w-full flex flex-col items-start justify-start flex-grow">
        {data && data.length > 0 ? (
          <div className="w-full flex flex-col gap-3.5">
            {data.map((post: any, index: number) => (
              <Alert key={post.id}>
                <Info className="h-4 w-4" />
                <AlertTitle>{post.title}</AlertTitle>
                <AlertDescription>{post.content}</AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <p className="justify-center items-center mx-auto my-auto dark:text-default-500 text-white">
            No alerts are available for your role ({user && user.role}).
          </p>
        )}
      </section>
    </div>
  )
}
