import NewsPostComponent from "@/components/news/NewsPost"
import AdminDashboard from "@/components/news/admin-post"

export const runtime = 'edge';

export default function NewsPost({ params }: { params: { id: string } }) {
    const { id } = params
    return (
        <main>
            <NewsPostComponent id={id as string} />
            <AdminDashboard id={id as string}/>
        </main>
    )}
