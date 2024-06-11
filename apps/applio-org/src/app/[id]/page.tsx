import UserCard from "@/components/profile/user-card";

export default function Profile({ params }: { params: { id: string } }) {
    const id = params.id

    return (
        <main className="md:min-h-[80svh] flex justify-center items-start p-16 mx-auto">
           <UserCard id={id} />
        </main>
    )
}
