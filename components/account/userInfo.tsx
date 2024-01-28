"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"

type Props = {
  id: string
}

const supabase = createClientComponentClient()

export default function UserInfo({ id }: Readonly<Props>) {
  const router = useRouter()
  const [data, setData] = useState<any[] | null>(null)
  const [user, setUser] = useState<any>(null)
  const [_error, setError] = useState<PostgrestError | null>(null)
  const [totalLikes, setTotalLikes] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("full_name", id)

      if (userError) {
        setError(userError)
      }

      if (userData?.length === 0) {
        setError({
          details: "",
          hint: "",
          code: "",
          message: "This user does not exist",
        })
      }

      setUser(userData?.[0])

      const { data: modelsData, error: modelsError } = await supabase
        .from("models")
        .select("*")
        .eq("author_username", id)

      if (modelsError) {
        setError(modelsError)
        return
      }

      setData(modelsData)

      const likes = modelsData.reduce(
        (total, model) => total + (parseInt(model.likes, 10) || 0),
        0
      );
      setTotalLikes(likes);

      setLoading(false)
    }

    fetchData()
  }, [id])

  if (!loading && user === undefined && (data === null || data.length === 0)) {
    return (
      <div className="flex flex-col gap-2 p-5 justify-center items-center top-0 left-0 w-full h-full fixed text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight fade-in">
          User not found (404)
        </h1>
        <button
          onClick={() => router.back()}
          className="underline underline-offset-4 hover:text-zinc-300 gtransition"
        >
          Return
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl flex flex-col gap-4 text-center">
      <div className="flex py-2 items-center flex-wrap gap-3 justify-center">
        <button
          onClick={() => router.back()}
          className="cursor-pointer flex items-center flex-wrap gap-3 px-4 py-2 bg-black dark:bg-white dark:bg-opacity-20 mt-5 z-10 hover:bg-opacity-80 dark:hover:bg-opacity-5 active:opacity-50 rounded-lg gtransition text-white w-full justify-center"
        >
          <span>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </span>
          Return
        </button>
      </div>
      {loading && (
        <div className="justify-center items-center flex flex-col h-72">
          <div className="text-white h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      )}
      {loading ||
        (user === undefined && (
          <div className="justify-center items-center flex flex-col ">
            <h1 className="font-black text-white text-6xl md:text-9xl tracking-tighter z-[2] drop-shadow-3xl">
              {id.length > 15 ? `${id.slice(0, 15)}...` : id}
            </h1>
            <p className="sm:text-xl max-w-3xl z-[2] drop-shadow-3xl text-white md:pt-2 text-center">
              This user does not have an account at this web, but we still have
              some of his models.
            </p>
          </div>
        ))}
      {loading ||
        (user != null && (
          <>
            <article className="md:col-span-8 overflow-hidden md:h-96 relative gtransition w-full h-full p-5 gap-4 flex flex-col rounded-3xl border-2 border-black/60 dark:border-white/20 backdrop-filter backdrop-blur-3xl bg-clip-padding justify-start items-start relative">
              <div className="h-full flex flex-col justify-center items-center bg-black w-full absolute overflow-hidden blur-3xl -ml-5 -mt-5 gtransition  opacity-60 ">
                <img
                  src={user.avatar_url || "/poster.png"}
                  className="w-full h-full object-cover"
                  alt={user.full_name}
                  onError={(e) => {
                    e.currentTarget.src = "/poster.png"
                  }}
                />
              </div>
              <div className="flex flex-col justify-center items-center text-center gap-4 w-full h-full z-[2] p-5">
                <h1 className="font-black text-white text-6xl md:text-9xl tracking-tighter z-[2] drop-shadow-3xl">
                  {id}
                </h1>
                <p className="sm:text-xl max-w-3xl z-[2] drop-shadow-3xl text-white md:pt-2">
                  {user.bio}
                </p>
              </div>
            </article>
            <section className="grid grid-cols-1 md:grid-cols-7 w-full grid-rows-1 gap-4 gtransition">
              <article className="md:col-span-8 lg:col-span-4 overflow-hidden w-full h-full p-5 gap-4 flex flex-col rounded-3xl bg-black border-2 border-white/20 justify-start items-start relative">
                <h2 className="font-semibold text-2xl z-10 text-white">
                  Information
                </h2>
                <section className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 z-10 flex-grow">
                  <article className="undefined flex flex-col bg-white/20 rounded-2xl p-4 justify-center items-center text-center truncate">
                    <h2 className=" undefined tracking-tight text-4xl font-bold w-full truncate text-white">
                      {data?.length}
                    </h2>
                    <p className="text-neutral-300 truncate">Models</p>
                  </article>
                  <article className="undefined flex flex-col bg-white/20 rounded-2xl p-4 justify-center items-center text-center truncate">
                    <h2 className=" undefined tracking-tight text-4xl font-bold w-full truncate text-white capitalize">
                      {user.role}
                    </h2>
                    <p className="text-neutral-300 truncate">Role</p>
                  </article>
                  <article className="undefined flex flex-col bg-white/20 rounded-2xl p-4 justify-center items-center text-center truncate">
                    <h2 className=" undefined tracking-tight text-4xl font-bold w-full truncate text-white">
                      {totalLikes}
                    </h2>
                    <p className="text-neutral-300 truncate">Likes</p>
                  </article>
                </section>
              </article>
              <article className="md:col-span-3 w-full h-full p-5 gap-4 flex flex-col rounded-3xl bg-black border-2 border-white/20 justify-start items-start relative">
                <h2 className="font-semibold text-2xl z-10 text-white">
                  Links
                </h2>
                <div className="flex flex-col gap-2 w-full">
                  {user.links && user.links.length > 0 ? (
                    user.links
                      .slice(0, 2)
                      .map((link: string, index: number) => {
                        const linkWithoutHttps = link.replace(/^https:\/\//, "")
                        return (
                          <a
                            key={id}
                            href={link}
                            rel="noreferrer"
                            target="_blank"
                            className="bg-white/10 hover:bg-white/20 active:opacity-50 flex gap-2 gtransition w-full py-2 px-3 rounded-xl"
                          >
                            <div className="h-full flex justify-center items-start flex-col flex-grow text-left truncate">
                              <p></p>
                              <p className="text-xl truncate w-full text-white">
                                {linkWithoutHttps}
                              </p>
                            </div>
                            <span className="h-full flex justify-center items-center text-white">
                              <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                            </span>
                          </a>
                        )
                      })
                  ) : (
                    <p className="text-neutral-300 pt-6">
                      This user does not have any links to share.
                    </p>
                  )}
                </div>
              </article>
            </section>
          </>
        ))}
    </div>
  )
}
