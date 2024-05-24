import EditPost from "@/components/news/edit-post"

export const runtime = typeof window === 'undefined' ? 'edge' : 'nodejs';

export default function NewsPost({ params }: { params: { id: number } }) {
    const { id } = params
    return (
        <main>
            <EditPost id={id as number}/>
        </main>
    )}
