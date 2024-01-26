"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useClipboard } from "@mantine/hooks"
import { Button, Skeleton, Tooltip } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { Copy, Download, ThumbsUp } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"
import { addPost } from "@/app/actions/like-model-action"
import { Database } from "@/app/types/database"

interface Model {
  id: string
  image_url: string
  name: string
  author_username: string | null
  author_id: string | null
  created_at: string
  type: string
  epochs: string
  algorithm: string
  link: string
  likes: string
}

export default function Home({ params }: Readonly<{ params: { id: string } }>) {
  const { id } = params
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [data, setData] = useState<Model | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [_loading, setLoading] = useState(true)
  const [userModels, setUserModel] = useState<any | null>(null)
  const { toast } = useToast()
  const [allLoad, setAllLoad] = useState(false)
  const [userAllLoad, setUserAllLoad] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: userData, error: userError } = await supabase
          .from("models")
          .select("*")
          .eq("id", id)

        if (userError) {
          setError(userError)
        } else {
          setData(
            userData && userData.length > 0
              ? ({
                  id: userData[0].id,
                  author_id: userData[0].author_id,
                  name: userData[0].name ?? null,
                  algorithm: userData[0].algorithm ?? null,
                  created_at: userData[0].created_at
                    ? new Date(userData[0].created_at).toLocaleDateString(
                        "en-US"
                      )
                    : null,
                  epochs: userData[0].epochs ?? null,
                  image_url: userData[0].image_url ?? null,
                  link: userData[0].link ?? null,
                  type: userData[0].type ?? null,
                  author_username: userData[0].author_username ?? null,
                } as Model)
              : null
          )
        }
      } catch (error) {
        setError(error as PostgrestError)
      } finally {
        setLoading(false)
        setAllLoad(true)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { error: userError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data?.author_id ?? "")

        if (userError) {
          setError(userError)
          return
        }
      } catch (error) {
        setError(error as PostgrestError)
      }
    }
    if (data?.author_id) {
      fetchUserData()
    }
  }, [data?.author_id])

  const defaultImageUrl = "/applio_logo.png"
  const defaultImageUrl2 = "/no_bg_applio_logo.png"
  const defaultName = "Unknown name"
  const imageUrlToShow =
    data?.image_url === null || data?.image_url === "n/a" || error
      ? defaultImageUrl
      : data?.image_url
  const name =
    data?.name === null || data?.name === "n/a" ? defaultName : data?.name
  const defaultType = "Unknown type"
  const type =
    data?.type === null || data?.type === "n/a" ? defaultType : data?.type
  const defaultEpochs = "Unknown"
  const epochs =
    data?.epochs === null || data?.epochs === "n/a"
      ? defaultEpochs
      : data?.epochs
  const defaultAlgorithm = "Unknown algorithm"
  const algorithm =
    data?.algorithm === null || data?.algorithm === "n/a"
      ? defaultAlgorithm
      : data?.algorithm

  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (
    event
  ) => {
    setData((prevData) => {
      if (prevData) {
        return { ...prevData, image_url: defaultImageUrl }
      }
      return prevData
    })
  }

  const goToProfile = () => {
    window.location.href = `/user/${data?.author_username}`
  }

  function redirect(destination: string) {
    window.location.href = destination
  }

  const handleDeletePost = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session === null) {
      redirect("/login")
    } else {
      if (userLiked) {
        return
      }

      const likedItems = JSON.parse(localStorage.getItem("likedItems") || "[]")
      likedItems.push(id)
      localStorage.setItem("likedItems", JSON.stringify(likedItems))

      const formData = new FormData()
      formData.append("id", id)

      await addPost(formData)

      setUserLiked(true)
    }
  }
  const [userLiked, setUserLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const clipboard = useClipboard({ timeout: 500 })

  useEffect(() => {
    async function fetchModelsUser() {
      const { data: userData, error: userError } = await supabase
        .from("models")
        .select("*")
        .range(1, 4)
        .order("image_url", { ascending: true })
        .eq("author_id", data?.author_id ?? "")

      if (userError) {
        setError(userError)
        return
      }

      setUserModel(userData)
      setUserAllLoad(true)
    }

    if (data?.author_id) {
      fetchModelsUser().catch(setError)
      setUserAllLoad(false)
    }
  }, [data?.author_id])

  const downloadModel = () => {
    window.open(`/models/download/${data?.id}`, "_blank")
  }

  return (
    <main className="px-2 mx-auto max-w-7xl w-full">
      <div className="px-2 py-4">
        <div className="flex py-2 items-center flex-wrap gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="cursor-pointer flex items-center flex-wrap gap-3 px-4 py-2  bg-black/10 dark:bg-[#2C2C2C] mt-5 z-10 dark:hover:bg-opacity-80 active:opacity-50 rounded-lg gtransition dark:text-white w-full justify-center"
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
        <article>
          <Skeleton
            isLoaded={allLoad}
            className="rounded-lg  bg-black/10 dark:bg-[#3c3c3c]"
          >
            <div className="rounded-xl drop-shadow-md  bg-black/10 dark:bg-[#2C2C2C] ">
              <div className="w-full h-40 md:w-full md:h-[480px] rounded-lg object-cover justify-center items-center mx-auto flex mb-4">
                <img
                  src={imageUrlToShow}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover  border-b border-white/30 gtransition"
                  width={300}
                  height={300}
                  onError={handleImageError}
                  style={{
                    objectFit: "cover",
                    objectPosition: "50% 20%",
                  }}
                />
              </div>
              <div className="flex items-start flex-col md:flex-row pb-4 px-4">
                <div className="flex flex-col w-full h-full md:h-24">
                  <a>
                    <h3 className="text-2xl font-bold dark:text-white mt-1 md:mt-0 hover:text-3xl gtransition">
                      {name}
                    </h3>
                  </a>
                  <div className="flex items-end gap-1 max-md:mb-2 max-md:pl-0.5 md:mt-0 text-gray-400 dark:text-neutral-400 text-md">
                    by{" "}
                    <span
                      className="font-bold text-gray-400 dark:text-neutral-400 cursor-pointer hover:underline text-md"
                      onClick={goToProfile}
                    >
                      {data?.author_username}
                    </span>
                    <span className=" text-gray-400 dark:text-neutral-400 text-md">
                      on {data?.created_at}
                    </span>
                  </div>
                  <div className="flex items-end md:mt-auto gap-1">
                    <div className="flex gap-1 flex-wrap">
                      <span className="bg-gray-200  dark:bg-neutral-900  text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg text-xs flex items-center justify-center text-center whitespace-pre">
                        {type}
                      </span>
                      <span className="bg-gray-200  dark:bg-neutral-900  text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg text-xs flex items-center justify-center text-center whitespace-pre">
                        {epochs} epochs
                      </span>
                      <span className="bg-gray-200  dark:bg-neutral-900  text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg text-xs flex items-center justify-center text-center whitespace-pre uppercase">
                        {algorithm}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex h-24 flex-col items-end">
                  <div className="flex gap-2 justify-center items-end mb-auto">
                    <div>
                      <Tooltip
                        placement="left"
                        color="foreground"
                        content="Open Applio to run this function!"
                      >
                        <div>
                          {data?.link.endsWith(".zip") && (
                            <Button
                              color="success"
                              radius="md"
                              size="lg"
                              variant="shadow"
                              className="px-3 py-1 w-14 h-10 rounded-lg flex items-center justify-center gap-1 cursor-pointer bg-green-500 text-black"
                              isIconOnly
                              startContent={
                                isLoading ? null : (
                                  <img
                                    src="/no_bg_applio_logo.png"
                                    className="w-full h-full scale-150 hover:scale-110 gtransition"
                                  ></img>
                                )
                              }
                              isDisabled={isLoading}
                              isLoading={isLoading}
                              onClick={async () => {
                                toast({
                                  title:
                                    "Be patient, this process can take time.",
                                  description:
                                    "You can check the CMD to see how the download is going.",
                                })
                                setTimeout(() => {
                                  setIsLoading(true)
                                }, 4000)

                                try {
                                  const response = await fetch(
                                    "http://localhost:8000/download/" +
                                      data?.link
                                  )
                                  toast({
                                    title: "${name} has been downloaded!",
                                  })

                                  if (!response.ok) {
                                    throw new Error(
                                      "La solicitud no pudo completarse correctamente"
                                    )
                                  }
                                  setTimeout(() => {
                                    setIsLoading(false)
                                  }, 4000)
                                } catch (error) {
                                  console.error("Error en la solicitud:", error)

                                  setIsLoading(false)
                                }
                              }}
                            ></Button>
                          )}
                        </div>
                      </Tooltip>
                    </div>
                    <Button
                      className="px-3 py-1 w-12 h-10 rounded-lg flex items-center justify-center gap-1 cursor-pointer bg-gray-200 text-black hover:bg-opacity-70 active:scale-75 gtransition"
                      onClick={handleDeletePost}
                      isDisabled={userLiked}
                      isIconOnly
                    >
                      <ThumbsUp
                        className={userLiked ? "text-green-500" : "text-black"}
                      />
                    </Button>
                    <div
                      className="px-3 py-1 w-12 h-10 rounded-lg flex  items-center justify-center gap-1 cursor-pointer bg-gray-200 text-black  hover:bg-opacity-70 active:scale-75 gtransition"
                      onClick={() => {
                        clipboard.copy(
                          `https://applio.org/models/download/${id}`
                        )
                        toast({
                          title: "Link copied to clipboard",
                          description: `Now you can share the ${name} model with your friends!`,
                        })
                      }}
                    >
                      <Copy />
                    </div>
                    <div
                      className="px-3 py-1 w-fit h-10 rounded-lg flex items-center justify-center gap-1 cursor-pointer bg-white text-black font-medium hover:bg-opacity-70 active:scale-75 gtransition"
                      onClick={downloadModel}
                    >
                      <Download /> <span className="ml-2">Download</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Skeleton>
          <Skeleton
            isLoaded={userAllLoad}
            className="flex flex-col rounded-lg gap-2 md:items-start w-full drop-shadow-md bg-white dark:bg-neutral-700 my-2"
          >
            <div className="md:flex gap-2  w-full rounded-sm mt-4 md:mx-auto">
              {userModels?.map((model: Model) => (
                <div
                  key={model.id}
                  className="relative flex items-start bg-black/10 dark:bg-neutral-800 rounded-lg flex-shrink-0 h-18 w-full md:w-[305px] cursor-pointer gtransition hover:opacity-80 max-md:mb-4"
                  onClick={() => (window.location.href = `/models/${model.id}`)}
                >
                  <div className="w-32 h-20 md:w-32 md:h-20  mr-4 relative object-cover">
                    <img
                      src={
                        model.image_url === null || model.image_url === "N/A"
                          ? defaultImageUrl2
                          : model.image_url
                      }
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = defaultImageUrl2
                      }}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover rounded-l-lg "
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="flex flex-col items-start py-2 px-1 ">
                    <h1 className="line-clamp-1 overflow-hidden overflow-ellipsis w-full">
                      {model.name}
                    </h1>
                    <h2>
                      {isNaN(new Date(model.created_at).getTime())
                        ? "Unknown date"
                        : new Date(model.created_at).toLocaleDateString(
                            "en-US"
                          )}
                    </h2>
                  </div>
                  <div className="absolute bottom-1 right-2 flex items-center gap-1 rounded-md">
                    <div className="flex items-center gap-1 rounded-md  bg-black/10 dark:bg-neutral-800 px-2 text-center text-gray-400">
                      <ThumbsUp className="w-4 h-4" />
                      <div className="ml-auto mr-auto">{model.likes}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Skeleton>
        </article>
      </div>
    </main>
  )
}
