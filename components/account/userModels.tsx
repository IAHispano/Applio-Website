"use client"

import { useEffect, useState } from "react"
import { Spinner } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import InfiniteScroll from "react-infinite-scroll-component"

import TestCard from "../models/test-card"

type Props = {
  id: string
}

const supabase = createClientComponentClient()

export default function UserModels({ id }: Readonly<Props>) {
  const [search, _setSearch] = useState("")
  const [data, setData] = useState<any[] | null>(null)
  const [_error, setError] = useState<PostgrestError | null>(null)
  const [_posts, setPosts] = useState<any[] | null>(null)
  const supabase = createClientComponentClient()
  const [end, setEnd] = useState(14)
  const [hasMore, setHasMore] = useState(true)
  const [increment, _setIncrement] = useState(10)
  const [loading, setLoading] = useState(false)
  const [selectedFilter, _setSelectedFilter] = useState("")
  const [algorithmFilter, _setAlgorithmFilter] = useState("")

  async function fetchData() {
    if (loading) return
    setLoading(true)
    let query = supabase
      .from("models")
      .select("*")
      .order("image_url", { ascending: false })
      .eq("author_username", id)

    query = query.range(0, end)

    try {
      const updatedEnd = end
      const { data: fetchedData, error } = await query

      if (error) {
        setError(error)
      } else {
        if (fetchedData.length < updatedEnd) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }

        setData(fetchedData)
        setPosts(fetchedData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(error as PostgrestError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [end, search, selectedFilter, algorithmFilter])

  function loadmore() {
    if (hasMore && !loading) {
      setEnd(end + increment)
    }
  }

  if (!data) {
    return (
      <div className="justify-center items-center flex flex-col h-72"></div>
    )
  }

  return (
    <>
      {data.length !== 0 && (
        <section>
          <InfiniteScroll
            dataLength={data.length}
            hasMore={hasMore}
            next={loadmore}
            className="w-full"
            loader={
              <div className="flex items-center justify-center">
                <p>Loading...</p>
              </div>
            }
            endMessage={
              <div className="flex items-center justify-center">
                <b>You have reached the end.</b>
              </div>
            }
          >
            <section className="mt-4 grid grid-cols-1 2xl:gridcols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-5 pb-8 md:pb-8 items-center justify-center mx-auto">
              {data?.map((post: any, index: number) => {
                const {
                  name,
                  image_url: imageUrl,
                  created_at,
                  link,
                  id,
                  epochs,
                  version,
                  type,
                  algorithm,
                  author_id,
                  author_username,
                  likes,
                } = post
                return (
                  <div className="w-full button-cursor" key={id}>
                    <TestCard
                      name={name}
                      imageUrl={imageUrl}
                      created_at={created_at}
                      id={id}
                      link={link}
                      epochs={epochs}
                      version={version}
                      type={type}
                      algorithm={algorithm}
                      author_id={author_id}
                      likes={likes}
                      author_username={author_username}
                    />
                  </div>
                )
              })}
            </section>
          </InfiniteScroll>
        </section>
      )}
    </>
  )
}
