import UserInfo from "@/components/account/userInfo"
import UserModels from "@/components/account/userModels"

export const runtime = "edge"

export default function User({ params }: Readonly<{ params: { id: string } }>) {
  const { id } = params

  return (
    <main className="w-full py-8 flex flex-col top-0 min-h-screen gap-4 px-5">
      <div className="justify-center items-center text-center flex">
        <UserInfo id={id} />
      </div>
      <div className="md:px-44">
        <UserModels id={id} />
      </div>
    </main>
  )
}
