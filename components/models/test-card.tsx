import React, { useEffect, useState } from "react"
import {
  Skeleton,
} from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { ThumbsUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Database } from "@/app/types/database"

interface TestCardProps {
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
}

const TestCard: React.FC<TestCardProps> = ({
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
}) => {
  const supabase = createClientComponentClient<Database>()
  const [user, setUser] = useState<any | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [allLoad, setAllLoad] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [loading, setLoading] = useState(true)

  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
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
  }, [author_id])

  const handleImageLoad = () => setLoading(false)
  const handleImageError = () => {
    setImageError(true)
    setLoading(false)
  }

  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(Number(timestamp))
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${month}/${day}/${year}`
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
    <Skeleton isLoaded={allLoad} className="rounded-lg">
      <div
        className="flex flex-col p-2 rounded-lg overflow-hidden shadow-lg w-full max-h-[300px] cursor-pointer bg-white/20 backdrop-blur-sm"
        onClick={goToModel}
      >
        <div className="relative w-full flex items-center justify-center mb-2">
          <div className="flex gap-2 absolute bottom-2 right-2">
            <div className="flex items-center gap-1 rounded-md bg-neutral-700/50 backdrop-blur-sm shadow-2xl border-white/10 border px-2 py-1 text-center text-white">
              <ThumbsUp size={24} />
              <div className="ml-auto mr-auto">{parseInt(likes, 10)}</div>
            </div>
          </div>
        </div>
        <h5 className="font-bold text-lg w-full px-1 text-white truncate">
          {name}
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
        <div className="flex gap-3 px-3 py-2 mt-4 justify-center backdrop-blur-md rounded-lg shadow-sm">
          {algorithm && algorithm !== "N/A" && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-lg  text-white">
              <p className="capitalize font-medium">{algorithm}</p>
            </div>
          )}
          {epochs && epochs !== "N/A" && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-lg  text-white">
              <p className="capitalize font-medium">{epochs} Epochs</p>
            </div>
          )}
        </div>
      </div>
    </Skeleton>
  )
}

export default TestCard
