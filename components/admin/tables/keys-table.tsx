import { useCallback, useEffect, useState } from "react"
import {
  Button,
  Chip,
  ChipProps,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import {
  Activity,
  Pencil,
  SearchIcon,
  Shield,
  User,
  X,
} from "lucide-react"

import { Database } from "@/app/types/database"

export default function KeysTable({ id }: { id: string }) {
  const supabase = createClientComponentClient<Database>()

  const [users, setUsers] = useState<any[] | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [search, setSearch] = useState("")
  const [end, setEnd] = useState(14)
  const [hasMore, setHasMore] = useState(true)
  const [increment, setIncrement] = useState(10)
  const [data, setData] = useState<any[] | null>(null)
  const [posts, setPosts] = useState<any[] | null>(null)
  const [fullNames, setFullNames] = useState<Record<string, string>>({})
  const [dataLoaded, setDataLoaded] = useState(true)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedToken, setSelectedToken] = useState<User | null>(null)

  async function fetchData() {
    let query = supabase
      .from("tokens")
      .select("*")
      .order("created_at", { ascending: false })

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

      const promises = fetchedData.map(async (user: any) => {
        try {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("auth_id", user.user)
            .single()

          if (!profileError) {
            return {
              user: user.user,
              fullName: profileData?.full_name || user.user,
            }
          } else {
            console.error("Error al obtener el full_name:", profileError)
            return { user: user.user, fullName: user.user }
          }
        } catch (error) {
          console.error("Error en la solicitud:", error)
          return { user: user.user, fullName: user.user }
        }
      })

      const newFullNamesArray = await Promise.all(promises)
      const newFullNames: Record<string, string> = {}
      newFullNamesArray.forEach(({ user, fullName }) => {
        newFullNames[user] = fullName
      })

      setFullNames(newFullNames)
      setDataLoaded(false)
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

  const openModal = useCallback(
    (token: User) => {
      setSelectedToken(token)
      onOpen()
    },
    [onOpen]
  )

  type User = {
    id: string
    user: string
    token: string
    role: string
    usage: string
    status: string
  }

  const renderCell = useCallback(
    (user: User, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof User]

      switch (columnKey) {
        case "status":
          let statusColor: ChipProps["color"] = "default"
          let statusText: string = "Unknown"

          if (parseInt(user.usage, 10) === 0) {
            statusColor = "warning"
            statusText = "Inactive"
          } else if (user.status === "active") {
            statusColor = "success"
            statusText = "Active"
          } else if (user.status === "paused") {
            statusColor = "danger"
            statusText = "Paused"
          }

          if (parseInt(user.usage, 10) >= 100) {
            statusColor = "danger"
            statusText = "Exceeding Limit"
          }

          return (
            <Chip
              className="capitalize"
              color={statusColor}
              size="sm"
              variant="flat"
            >
              {statusText}
            </Chip>
          )

        case "user":
          return (
            <div
              onClick={() =>
                (window.location.href = `/user/${
                  fullNames[user.user] || user.user
                }`)
              }
              className="cursor-pointer"
            >
              {fullNames[user.user] || user.user}
            </div>
          )
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => openModal(user)}
                >
                  <Pencil />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleDelete(user.token)}
                >
                  <X />
                </span>
              </Tooltip>
            </div>
          )
        default:
          return cellValue
      }
    },
    [dataLoaded, openModal]
  )

  const handleEdit = async () => {
    try {
      if (selectedToken) {
        const { data: updatedData, error: updateError } = await supabase
          .from("tokens")
          .update({
            role: selectedToken.role,
            status: selectedToken.status,
          })
          .eq("token", selectedToken.token)

        if (updateError) {
          console.error("Error al actualizar los datos:", updateError)
        } else {
          console.log("Datos actualizados exitosamente")
          fetchData()
          onOpenChange()
        }
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error)
    }
  }

  const handleDelete = async (token: string) => {
    try {
      const { data: deletedData, error: deleteError } = await supabase
        .from("tokens")
        .delete()
        .eq("token", token)

      if (deleteError) {
        console.error("Error al eliminar la clave:", deleteError)
      } else {
        console.log("Clave eliminada exitosamente")
        fetchData()
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error)
    }
  }

  return (
    <>
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
                hasMore && !dataLoaded ? (
                  <div className="flex w-full justify-center">
                    <Button variant="flat" onPress={loadmore}>
                      Load More
                    </Button>
                  </div>
                ) : null
              }
            >
              <TableHeader>
                <TableColumn>KEY</TableColumn>
                <TableColumn>USER</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>USE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody
                isLoading={dataLoaded}
                loadingContent={
                  <div className="my-8">
                    <Spinner />
                  </div>
                }
              >
                {(posts ?? []).map((post: any, index: number) => {
                  const { id, user, token, role, usage, status } = post

                  return (
                    <TableRow key={id}>
                      <TableCell>{renderCell(post, "token")}</TableCell>
                      <TableCell>{renderCell(post, "user")}</TableCell>
                      <TableCell className="capitalize">
                        {renderCell(post, "role")}
                      </TableCell>
                      <TableCell>{renderCell(post, "usage")}</TableCell>
                      <TableCell>{renderCell(post, "status")}</TableCell>
                      <TableCell>{renderCell(post, "actions")}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update key information
                <span className="text-sm text-default-400">
                  {selectedToken?.token}
                </span>
              </ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="User"
                  readOnly
                  defaultValue={
                    (selectedToken?.user !== undefined &&
                      fullNames[selectedToken?.user]) ||
                    selectedToken?.user
                  }
                  variant="bordered"
                />
                <Input
                  endContent={
                    <Shield className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Role"
                  defaultValue={selectedToken?.role || ""}
                  onChange={(e) => {
                    setSelectedToken((prevToken) => ({
                      ...prevToken!,
                      role: e.target.value,
                    }))
                  }}
                  variant="bordered"
                />
                <Input
                  endContent={
                    <Activity className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Status"
                  defaultValue={selectedToken?.status || ""}
                  onChange={(e) => {
                    setSelectedToken((prevToken) => ({
                      ...prevToken!,
                      status: e.target.value,
                    }))
                  }}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleEdit}>
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
