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
  const [imageError, setImageError] = useState(false)

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
          const likedItems = JSON.parse(
            localStorage.getItem("likedItems") || "[]"
          )
          const userLikedModel = likedItems.includes(id)
          setUserLiked(userLikedModel)
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

      setUserLiked(true)
      await addPost(formData)
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

  const handleImageError = () => {
    setImageError(true)
    setLoading(false)
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
              { data?.image_url  === null || data?.image_url  === 'n/a' || imageError  && (
              <div className="flex flex-col justify-center items-center text-center mx-auto my-4 bg-white w-full h-full">
              <svg width="180" height="180" viewBox="0 0 234 262" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M135.513 62.3751C147.067 58.1154 158.525 55.8833 170.37 56.3098C187.624 56.6716 200.645 64.798 211.496 77.4453C223.714 91.6854 230.765 108.314 232.816 127.159C233.997 138.015 233.579 148.867 232.096 159.712C230.079 174.461 226.723 188.814 220.711 202.377C215.539 214.046 210.122 225.671 201.937 235.467C191.702 247.715 179.377 256.934 163.96 261.07C158.673 262.489 153.394 262.284 148.174 260.46C140.316 257.715 132.336 255.377 124.382 252.951C120.685 251.823 117.075 251.778 113.381 252.779C103.715 255.397 94.1003 258.262 84.352 260.501C70.7036 263.635 58.4583 260.589 47.8815 250.749C31.5163 235.525 20.0427 216.888 11.6532 196.056C6.3285 182.835 2.38509 169.159 1.11337 154.889C-1.00264 131.144 2.09256 108.292 14.5403 87.6696C21.3562 76.3778 30.1515 66.9244 41.8262 60.7726C48.9133 57.0381 56.5469 55.9969 64.3976 56.211C77.8502 56.5777 90.9126 59.6333 104.022 62.364C104.929 62.553 105.843 62.7072 106.758 62.8502C106.882 62.8695 107.029 62.7277 107.387 62.5514C106.487 59.0799 104.779 55.9439 102.981 52.9121C98.641 45.5932 93.7666 38.6507 88.6491 31.8884C87.094 29.8335 85.2169 28.8951 82.6445 28.9401C77.21 29.0352 75.1317 25.9196 76.8318 20.5179C78.6004 14.8982 83.636 13.0338 88.4334 16.1936C90.0258 17.2423 91.34 18.575 92.5448 20.0585C97.7514 26.4697 102.077 33.4992 106.113 40.7275C108.181 44.4316 109.465 48.471 110.632 52.5545C110.929 53.5964 111.012 54.7785 112.093 55.6003C113.53 54.3577 113.268 52.5027 113.421 50.9983C114.94 36.0447 122.093 24.6043 133.415 15.5219C141.19 9.28455 149.27 3.72894 158.812 0.812341C159.702 0.54056 160.606 0.301193 161.517 0.130463C165.002 -0.521938 167.028 1.30135 167.459 4.9527C169.472 22.037 162.663 35.4978 151.473 47.2382C147.213 51.707 142.602 55.7337 137.741 59.4719C136.959 60.073 136.013 60.546 135.513 62.3751Z" fill="#000"/>
              </svg>
              <p className="text-black text-center text-xl mt-10">No image</p>
              </div>
            )}
              { data?.image_url !== null && data?.image_url !== 'n/a' && !imageError && (
                <img
                  src={imageUrlToShow}
                  loading="eager"
                  decoding="async"
                  className="size-full object-cover  border-b border-white/30 gtransition"
                  width={300}
                  height={300}
                  alt="model image"
                  onError={handleImageError}
                  style={{
                    objectFit: "cover",
                    objectPosition: "50% 20%",
                  }}
                />
                )}
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
            <div
            className="md:hidden mt-3 p-4 rounded-lg flex items-center justify-center gap-1 cursor-pointer bg-white text-black font-medium hover:bg-opacity-70 active:scale-75 gtransition"
            onClick={downloadModel}
          >
              <span className="ml-2">Download</span>
          </div>
          </Skeleton>
          <Skeleton
            isLoaded={userAllLoad}
            className="flex flex-col rounded-lg gap-2 md:items-start w-full drop-shadow-md bg-white dark:bg-neutral-700 mb-2"
          >
            <div className="md:flex gap-2  w-full rounded-sm mt-4 md:mx-auto">
              {userModels?.map((model: Model) => (
                <div
                  key={model.id}
                  className="relative flex items-start bg-black/10 dark:bg-neutral-800 rounded-lg shrink-0 h-18 w-full md:w-[305px] cursor-pointer gtransition hover:opacity-80 max-md:mb-4"
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
                      className="size-full object-cover rounded-l-lg "
                      width={300}
                      height={300}
                      alt="Model image"
                    />
                  </div>
                  <div className="flex flex-col items-start py-2 px-1 ">
                    <h1 className="line-clamp-1 overflow-hidden text-ellipsis w-full">
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
