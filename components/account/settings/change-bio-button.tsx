"use client"

import { Button } from "@nextui-org/react"
import { useFormStatus } from "react-dom"

export function ChangeBioButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      isLoading={pending}
      type="submit"
      color="primary"
      className="px-5 py-2 self-end my-4"
    >
      {pending ? "Please wait..." : "Update"}
    </Button>
  )
}
