import EditPost from "@/components/news/edit-post"

export const runtime = 'edge';

export default function NewsPost({ params }: { params: { id: string } }) {
    const { id } = params
    return (
        <main>
            <EditPost id={id as string}/>
        </main>
    )}
