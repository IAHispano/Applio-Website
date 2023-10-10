import { AuthButtonServer } from "@/components/auth-button-server";

export default function Login () {
  return (
    <main className="my-10">
    <h1 className="bg-gradient-radial text-transparent bg-clip-text mx-auto flex items-center justify-center text-5xl md:text-9xl p-4 font-bold leading-tight tracking-tighter mt-24">
    You must log in
    </h1>
    <div className="block md:hidden">
    <section className="grid place-content-center md:mt-24">
      <AuthButtonServer />
    </section>
    </div>
    </main>
  )
}