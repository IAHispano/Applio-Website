"use client"

import { useEffect, useState } from "react"
import { Button, Divider, Input, Progress, Spinner } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { ArrowRight, SearchIcon } from "lucide-react"
import InfiniteScroll from "react-infinite-scroll-component"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import TestCard from "@/components/models/test-card"

export default function Home() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState<any[] | null>(null)
  const [_error, setError] = useState<PostgrestError | null>(null)
  const [posts, setPosts] = useState<any[] | null>(null)
  const supabase = createClientComponentClient()
  const [end, setEnd] = useState(14)
  const [hasMore, setHasMore] = useState(true)
  const [increment, setIncrement] = useState(10)
  const [loading, setLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("")
  const [algorithmFilter, setAlgorithmFilter] = useState("")

  async function fetchData() {
    if (loading) return
    setLoading(true)
    let query = supabase
      .from("models")
      .select("*")
      .order("image_url", { ascending: false })

    if (search) {
      query = query.ilike("name", `%${search}%`)
    }

    if (selectedFilter) {
      query = query.ilike("type", selectedFilter)
    }

    if (algorithmFilter) {
      query = query.ilike("algorithm", algorithmFilter)
    }

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
      <div className="flex items-center justify-center h-[40svh]">
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
    <section>
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore}
        next={loadmore}
        loader={
          <div className="flex items-center justify-center">
            <Spinner color="success" />
          </div>
        }
        endMessage={
          <div className="flex items-center justify-center">
            <b>You have reached the end.</b>
          </div>
        }
      >
        <div className="fixed rounded-2xl w-11/12 sm:w-[581px] h-40 sm:h-[80px] p-0.5 z-10 bottom-10 left-0 right-0 mx-auto">
          <div className="rounded-[14px] w-full h-full bg-background border-2 border-zinc-600   flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
            <p className="dark:text-white text-[13px] w-[304px] h-10 flex items-center justify-center p-3 text-black">
              Enjoy +500.000 voice models available in our database!
            </p>
            <a
              className="dark:text-black text-white text-[13px] dark:bg-white bg-[#090909] hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center "
              href="https://applio.org/bot"
            >
              Get Applio Bot{" "}
              <div className="ml-2">
                <ArrowRight size={20} strokeWidth={1.5} />
              </div>
            </a>
          </div>
        </div>
        <div className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xls"></div>
        <div className=" mb-2 gap-4 flex items-center justify-end mx-16 max-md:grid-cols-3 max-md:grid">
          <Button
            size="sm"
            variant={selectedFilter !== "rvc" ? "ghost" : undefined}
            onClick={() => {
              setSelectedFilter("rvc")
              fetchData()
            }}
          >
            RVC
          </Button>
          <Button
            size="sm"
            variant={selectedFilter !== "kits.ai" ? "ghost" : undefined}
            onClick={() => {
              setSelectedFilter("kits.ai")
              fetchData()
            }}
          >
            KITS.AI
          </Button>
          <Button
            size="sm"
            variant={algorithmFilter !== "rmvpe" ? "ghost" : undefined}
            onClick={() => {
              setAlgorithmFilter("rmvpe")
              fetchData()
            }}
          >
            RMVPE
          </Button>
          <Button
            size="sm"
            variant={algorithmFilter !== "mangio-crepe" ? "ghost" : undefined}
            onClick={() => {
              setAlgorithmFilter("mangio-crepe")
              fetchData()
            }}
          >
            MANGIO
          </Button>
          <Button
            size="sm"
            variant={algorithmFilter !== "crepe" ? "ghost" : undefined}
            onClick={() => {
              setAlgorithmFilter("crepe")
              fetchData()
            }}
          >
            CREPE
          </Button>
          <Button
            size="sm"
            variant={algorithmFilter !== "harvest" ? "ghost" : undefined}
            onClick={() => {
              setAlgorithmFilter("harvest")
              fetchData()
            }}
          >
            HARVEST
          </Button>
        </div>
        <form
          className="mx-auto flex items-center justify-center w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            classNames={{
              base: "w-full h-10 mx-16",
              mainWrapper: "h-full w-full",
              input: "text-small",
              inputWrapper:
                "h-full w-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Press ENTER to search a model"
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setEnd(9);
              setIncrement(9);
              fetchData(); 
            }}
          />
        </form>
        {!search && (
        <Carousel className="flex max-md:flex-wrap pb-4 md:max-w-8xl gap-5 mx-16 items-center justify-center py-2">
          <CarouselContent>
            {posts
              ?.slice()
              .sort((a, b) => parseInt(b.likes, 10) - parseInt(a.likes, 10))
              .map((post: any, index: number) => {
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
                  <CarouselItem key={id} className="md:basis-1/3">
                    <div className="p-1">
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
                  </CarouselItem>
                )
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        )}
        <section className="mt-4 grid grid-cols-1 2xl:gridcols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-w-8xl gap-5 pb-8 md:pb-8 mx-16 items-center justify-center">
          {posts?.map((post: any, index: number) => {
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
  )
}
