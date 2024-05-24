import NewsPostComponent from "@/components/news/NewsPost"
import AdminDashboard from "@/components/news/admin-post"
import { supabase } from "@/utils/database";

export const runtime = 'edge';

export default function NewsPost({ params }: { params: { id: string } }) {
    const { id } = params
    return (
        <main>
            <NewsPostComponent id={id as string} />
            <AdminDashboard id={id as string}/>
        </main>
    )}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
        .from("blog")
        .select("title, image_url, by, created_at")
        .eq("title", params.id)
        .single()
    
    if (error) {
        return {
        title: 'Applio',
        }
    }
    
    return {
        title: data.title,
        description: `Read ${data.title} created by ${data.by} at ${new Date(data.created_at), 'MMMM do, yyyy'}.`,
        openGraph: {
            title: data.title,
            images: data.image_url,
            description: `Read ${data.title} created by ${data.by} at ${new Date(data.created_at), 'MMMM do, yyyy'}.`,
            }  
    }
    }