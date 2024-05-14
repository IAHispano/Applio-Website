import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useClipboard } from "@mantine/hooks"
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Skeleton,
  Spinner,
  Tooltip,
} from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { Bot, Box, Copy, Heart, Share, Star, ThumbsUp } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { addPost } from "@/app/actions/like-model-action"
import { Database } from "@/app/types/database"

import { Toaster } from "../ui/toaster"

export default function TestCard({
  imageUrl,
  name,
  created_at,
  id,
  userFullName,
  link,
  epochs,
  version,
  type,
  algorithm,
  author_id,
  author_username,
  likes,
}: {
  imageUrl: string
  name: string
  created_at: string
  id: string
  userFullName?: string
  link: string
  epochs: string
  version: string
  type: string
  algorithm: string
  author_id: string
  author_username: string
  likes: string
}) {
  imageUrl = imageUrl ?? "N/A"

  const supabase = createClientComponentClient<Database>()
  const [data, setData] = useState<any[] | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [buttonClicked, setClicked] = useState(false)
  const { toast } = useToast()
  const [allLoad, setAllLoad] = useState(false)

  useEffect(() => {
    async function fetchData() {
      // Fetch user data based on full name
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", author_id)

      if (userError) {
        setError(userError)
        return
      }
      setUser(userData[0] || { full_name: "Unknown user" })
      setAllLoad(true)
    }

    fetchData()
  }, [userFullName])

  function formatDate(timestamp: string | number | Date) {
    const date = new Date(Number(timestamp))
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const formattedDate = `${month}/${day}/${year}`

    return formattedDate
  }
  const [_loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const handleImageLoad = () => {
    setLoading(false)
  }
  const handleImageError = () => {
    setImageError(true)
    setLoading(false)
  }

  function redirect(destination: string) {
    window.location.href = destination
  }

  const defaultImageUrl = "/applio_logo.png"
  const imageUrlToShow =
    imageUrl === null || imageUrl === "n/a" || imageError
      ? defaultImageUrl
      : `https://cjtfqzjfdimgpvpwhzlv.supabase.co/storage/v1/object/public/Images/${id}.webp`

  const goToModel = () => {
    window.location.href = `/models/${id}`
  }

  return (
    <Skeleton
      onClick={goToModel}
      isLoaded={allLoad}
      className="rounded-lg"
    >
      <div className="flex flex-col p-2 rounded-lg overflow-hidden shadow-lg w-full md:min-h-[400px] md:max-h-[400px] cursor-pointer md:border-white/20 md:border bg-white/20 backdrop-blur-sm max-md:p-8">
        <div className="relative w-full flex items-center justify-center mb-2">
          <div className="w-full h-[300px] rounded-lg relative">
            { imageUrl === null || imageUrl === 'n/a' || imageError && (
              <div className="flex flex-col justify-center items-center text-center mx-auto my-4">
              <svg width="180" height="180" viewBox="0 0 234 262" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M135.513 62.3751C147.067 58.1154 158.525 55.8833 170.37 56.3098C187.624 56.6716 200.645 64.798 211.496 77.4453C223.714 91.6854 230.765 108.314 232.816 127.159C233.997 138.015 233.579 148.867 232.096 159.712C230.079 174.461 226.723 188.814 220.711 202.377C215.539 214.046 210.122 225.671 201.937 235.467C191.702 247.715 179.377 256.934 163.96 261.07C158.673 262.489 153.394 262.284 148.174 260.46C140.316 257.715 132.336 255.377 124.382 252.951C120.685 251.823 117.075 251.778 113.381 252.779C103.715 255.397 94.1003 258.262 84.352 260.501C70.7036 263.635 58.4583 260.589 47.8815 250.749C31.5163 235.525 20.0427 216.888 11.6532 196.056C6.3285 182.835 2.38509 169.159 1.11337 154.889C-1.00264 131.144 2.09256 108.292 14.5403 87.6696C21.3562 76.3778 30.1515 66.9244 41.8262 60.7726C48.9133 57.0381 56.5469 55.9969 64.3976 56.211C77.8502 56.5777 90.9126 59.6333 104.022 62.364C104.929 62.553 105.843 62.7072 106.758 62.8502C106.882 62.8695 107.029 62.7277 107.387 62.5514C106.487 59.0799 104.779 55.9439 102.981 52.9121C98.641 45.5932 93.7666 38.6507 88.6491 31.8884C87.094 29.8335 85.2169 28.8951 82.6445 28.9401C77.21 29.0352 75.1317 25.9196 76.8318 20.5179C78.6004 14.8982 83.636 13.0338 88.4334 16.1936C90.0258 17.2423 91.34 18.575 92.5448 20.0585C97.7514 26.4697 102.077 33.4992 106.113 40.7275C108.181 44.4316 109.465 48.471 110.632 52.5545C110.929 53.5964 111.012 54.7785 112.093 55.6003C113.53 54.3577 113.268 52.5027 113.421 50.9983C114.94 36.0447 122.093 24.6043 133.415 15.5219C141.19 9.28455 149.27 3.72894 158.812 0.812341C159.702 0.54056 160.606 0.301193 161.517 0.130463C165.002 -0.521938 167.028 1.30135 167.459 4.9527C169.472 22.037 162.663 35.4978 151.473 47.2382C147.213 51.707 142.602 55.7337 137.741 59.4719C136.959 60.073 136.013 60.546 135.513 62.3751Z" fill="#EAEAEA"/>
              </svg>
              <p className="text-white text-center text-xl mt-10">No image</p>
              </div>
            )}
            { imageUrl !== null && imageUrl !== 'n/a' && !imageError && (
              <img
                src={`https://cjtfqzjfdimgpvpwhzlv.supabase.co/storage/v1/object/public/Images/${id}.webp`}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover rounded-lg "
                width={300}
                height={300}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>
          <div className="flex gap-2 absolute bottom-2 right-2">
            <div className="flex items-center gap-1 rounded-md bg-neutral-700/50 backdrop-blur-sm shadow-2xl border-white/10 border px-2 py-1 text-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-thumbs-up"
              >
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>
              <div className="ml-auto mr-auto">{parseInt(likes, 10)}</div>
            </div>
          </div>
        </div>
        <h5 className="font-bold text-lg w-full px-1 text-white justify-start flex">
          {name.length > 15 ? `${name.substring(0, 14)}...` : name}
        </h5>
        <p className="text-xs px-1 text-white/70  justify-start flex">
          by{" "}
          {author_username.length > 30
            ? `${author_username.substring(0, 10)}...`
            : author_username}{" "}
          at{" "}
          {isNaN(new Date(created_at).getTime())
            ? "Unknown date"
            : new Date(created_at).toLocaleDateString("en-US")}
          .
        </p>
        <div className="flex flex-col-3 gap-1 px-1 mt-2 justify-start flex">
          {algorithm !== "N/A" && algorithm !== null && algorithm !== "" && (
            <div className="flex items-center gap-1 rounded-md bg-gray-100 dark:bg-neutral-800 px-2 py-.5 text-center">
              <p className="capitalize">{algorithm}</p>
            </div>
          )}
          <div className="flex items-center gap-1 rounded-md bg-gray-100 dark:bg-neutral-800 px-2 py-.5 text-center">
            <p className="uppercase">{type}</p>
          </div>
          {epochs !== "N/A" && epochs !== null && epochs !== "" && (
            <div className="flex items-center gap-1 rounded-md bg-gray-100 dark:bg-neutral-800 px-2 py-.5 text-center">
              <p className="capitalize">{epochs} Epochs</p>
            </div>
          )}
        </div>
      </div>
    </Skeleton>
  )
}
