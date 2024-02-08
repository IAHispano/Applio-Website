import { AuthButtonServer } from "@/components/login/auth-button-server"

export default function Login() {
  return (
    <div className="flex flex-col gap-2 p-5 justify-center items-center top-0 left-0 size-full fixed text-center text-white">
      <h1 className="text-4xl font-bold tracking-tight fade-in mb-2">
        You must log in. (401)
      </h1>
      <AuthButtonServer />
    </div>
  )
}
