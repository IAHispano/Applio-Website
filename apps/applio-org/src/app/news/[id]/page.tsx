import NewsPostComponent from "@/components/news/NewsPost"
import AdminDashboard from "@/components/news/admin-post"

export const runtime = process.env.NODE_ENV === "development" ? undefined : 'edge';


export default function NewsPost({ params }: { params: { id: number } }) {
    const { id } = params
    return (
        <main>
            <NewsPostComponent id={id as number} />
            <AdminDashboard id={id as number}/>
        </main>
    )}
