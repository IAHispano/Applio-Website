import NewsPostComponent from "@/components/news/NewsPost"
import AdminDashboard from "@/components/news/admin-post"
import { supabase } from "@/utils/database";

export const runtime = 'edge';

export default function NewsPost({ params }: { params: { id: number } }) {
    const { id } = params
    return (
        <main>
            <NewsPostComponent id={id as number} />
            <AdminDashboard id={id as number}/>
        </main>
    )}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
        .from("blog")
        .select("title, image_url")
        .eq("id", parseInt(params.id))
    
    if (error) {
        return {
        title: 'Applio',
        }
    }
    
    return {
        title: data[0].title,
        openGraph: {
            title: data[0].title,
            images: data[0].image_url
          }  
    }
    }