import UserInfo from "@/components/account/userInfo"
import UserModels from "@/components/account/userModels"

export default function User({ params }: Readonly<{ params: { id: string } }>) {
  const { id } = params

  return (
    <main className="w-full py-8 flex flex-col top-0 justify-start items-center text-center min-h-screen relative gap-4 px-5">
      <UserInfo id={id} />
      <UserModels id={id} />
    </main>
  )
}
