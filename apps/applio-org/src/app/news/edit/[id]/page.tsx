import EditPost from "@/components/news/edit-post"

export const runtime = process.env.NODE_ENV === "development" ? undefined : 'edge';

export default function NewsPost({ params }: { params: { id: number } }) {
    const { id } = params
    return (
        <main>
            <EditPost id={id as number}/>
        </main>
    )}
