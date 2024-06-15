import NewsPostComponent from "@/components/news/NewsPost"
import AdminDashboard from "@/components/news/admin-post"
import { supabase } from "@/utils/database";

// Remove for local development:
export const runtime = 'edge';

export default function NewsPost({ params }: { params: { id: number } }) {
    const { id } = params
    return (
        <main>
            <NewsPostComponent id={id as number} />
            <AdminDashboard id={id as number}/>
        </main>
    )}

export async function generateMetadata({ params }: { params: { id: number } }) {
    const { data, error } = await supabase
        .from("blog")
        .select("title, image_url, by, created_at, tag")
        .eq("id", params.id)
        .single()
    
    if (error) {
        return {
        title: 'Applio',
        }
    }
    
    return {
        title: data.title,
        description: `Read an article about ${data.tag} created by ${data.by} at ${new Date(data.created_at).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}.`,
        openGraph: {
            title: data.title,
            images: data.image_url,
            description: `Read an article about ${data.tag} created by ${data.by} at ${new Date(data.created_at).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}.`,
            }  
    }
    }