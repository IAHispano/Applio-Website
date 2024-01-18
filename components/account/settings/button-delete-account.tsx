"use client"

import { Button } from "@nextui-org/button"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { addPost } from "@/app/actions/delete-account-action"

export function DeleteAccountButton() {
  const { pending } = useFormStatus()

  const formData = new FormData()

  const handleDeleteAccountClick = async () => {
    await addPost(formData)
  }

  return (
    <Button
      isLoading={pending}
      type="button"
      color="danger"
      className="flex items-center gap-2 active:opacity-50 font-medium py-2 px-4 gtransition"
      onClick={handleDeleteAccountClick}
    >
      {pending ? "Please wait..." : "Delete Account"}
    </Button>
  )
}
