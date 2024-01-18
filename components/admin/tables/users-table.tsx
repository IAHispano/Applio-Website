import { useEffect, useState } from "react"
import {
  Button,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { SearchIcon } from "lucide-react"

import { Database } from "@/app/types/database"

export default function UsersTable({ id }: { id: string }) {
  const supabase = createClientComponentClient<Database>()

  const [users, setUsers] = useState<any[] | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [search, setSearch] = useState("")
  const [end, setEnd] = useState(14)
  const [hasMore, setHasMore] = useState(true)
  const [increment, setIncrement] = useState(10)
  const [data, setData] = useState<any[] | null>(null)
  const [posts, setPosts] = useState<any[] | null>(null)

  async function fetchData() {
    let query = supabase
      .from("profiles")
      .select("*")
      .order("updated_at", { ascending: false })

    if (search) {
      query = query.ilike("full_name", `%${search}%`)
    }

    query = query.range(0, end)

    const { data: fetchedData, error } = await query

    if (error) {
      setError(error)
    } else {
      setData(fetchedData)
      setPosts(fetchedData)

      if (fetchedData.length < end) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [end])

  function loadmore() {
    if (hasMore) {
      setEnd(end + increment)
    }
  }

  return (
    <section className="hidden md:block">
      <div className="">
        <div className="md:mx-24 h-fit">
          <form
            className="flex items-center justify-center w-full"
            onSubmit={(e) => {
              e.preventDefault()
              setEnd(9)
              setIncrement(9)
              fetchData()
            }}
          >
            <Input
              classNames={{
                base: "w-full my-4",
                mainWrapper: "h-full w-full",
                input: "text-small",
                inputWrapper:
                  "h-full w-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Press ENTER to search a user"
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <Table
            aria-label="Users table"
            bottomContent={
              hasMore ? (
                <div className="flex w-full justify-center">
                  <Button variant="flat" onPress={loadmore}>
                    Load More
                  </Button>
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Loading data..."}>
              {(posts ?? []).map((post: any, index: number) => {
                const { id, full_name, role } = post

                return (
                  <TableRow key={id}>
                    <TableCell className="select-all">{id}</TableCell>
                    <TableCell>
                      <a href={`/user/${full_name}`}>{full_name}</a>
                    </TableCell>
                    <TableCell>{role}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
