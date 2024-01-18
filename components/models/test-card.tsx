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
      : imageUrl

  const goToModel = () => {
    window.location.href = `/models/${id}`
  }

  return (
    <Skeleton
      onClick={goToModel}
      isLoaded={allLoad}
      className=" md:active:scale-90 transition-all gtransition-low hover:opacity-80 "
    >
      <div className="flex flex-col p-2 rounded-lg overflow-hidden shadow-lg bg-black dark:bg-[#3c3c3c] w-full min-h-[400px] max-h-[400px] cursor-pointer">
        <div className="relative w-full flex items-center justify-center mb-2">
          <div className="w-full h-[300px] rounded-lg relative">
            <img
              src={imageUrlToShow}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover rounded-lg "
              width={300}
              height={300}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
          <div className="flex gap-2 absolute bottom-2 right-2">
            <div className="flex items-center gap-1 rounded-md bg-neutral-800 px-2 py-1 text-center text-white">
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
              <div className="ml-auto mr-auto">{likes}</div>
            </div>
          </div>
        </div>
        <h5 className="font-bold text-lg w-full px-1 text-white">
          {name.length > 29 ? `${name.substring(0, 20)}...` : name}
        </h5>
        <p className="text-xs px-1 text-white/70">
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
        <div className="flex flex-col-3 gap-1 px-1 mt-2">
          <div className="flex items-center gap-1 rounded-md bg-gray-100 dark:bg-neutral-800 px-2 py-.5 text-center">
            <p className="capitalize">{algorithm}</p>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-gray-100 dark:bg-neutral-800 px-2 py-.5 text-center">
            <p className="uppercase">{type}</p>
          </div>
        </div>
      </div>
    </Skeleton>
  )
}
