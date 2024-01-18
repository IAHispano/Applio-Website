"use client"

import { useEffect, useState } from "react"
import { cookies } from "next/headers"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
  Spacer,
  Spinner,
  User,
} from "@nextui-org/react"
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { PostgrestError, createClient } from "@supabase/supabase-js"

import TestCard from "@/components/models/test-card"
import { Database } from "@/app/types/database"

import AccountModelCard from "./model-card-account"

const supabase = createClientComponentClient<Database>()

interface ModelInfoProps {
  userFullName: string
}

export function ModelsAccount({ userFullName }: ModelInfoProps) {
  const [showAlert, setShowAlert] = useState(false)
  const [data, setData] = useState<any[] | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)

  const handleDownloadClick = () => {
    if (data) {
      const modelUrl = data[0]?.model_url

      if (modelUrl) {
        window.open(modelUrl, "_blank")
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      // Fetch user data based on full name
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("full_name", userFullName)

      if (userError) {
        setError(userError)
        return
      }

      setUser(userData[0])

      // Fetch models associated with the user's ID
      const { data: modelsData, error: modelsError } = await supabase
        .from("models")
        .select("*")
        .eq("author_id", userData[0]?.id)

      if (modelsError) {
        console.error("Error al consultar modelos:", modelsError)
        setError(modelsError)
        return
      }

      setData(modelsData)
    }

    fetchData()
  }, [userFullName])

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <h1>You have not uploaded any models.</h1>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center">
        <Spinner color="success" />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tight mb-4">Models</h2>
      <Divider />
      <section className="w-full flex flex-col items-start justify-start">
        <h2 className="text-2xl font-semibold tracking-tight mt-10 mb-4">
          Your Models
        </h2>
        <div className="grid grid-cols-1 mx-auto md:grid-cols-3 items-center justify-center p-3  bg-neutral-700 gap-3 rounded-3xl">
          {data.map((model) => (
            <div key={model.id}>
              <AccountModelCard
                name={model.name}
                imageUrl={model.image_url}
                created_at={model.created_at}
                id={model.id}
                userFullName={user.full_name}
                link={model.link}
                type={model.type}
                version={model.version}
                epochs={model.epochs}
                author_id={model.author_id}
                algorithm={model.algorithm}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ModelsAccount
