"use client"

import EditPost from "@/components/news/edit-post"

export default function NewsPost({ params }: { params: { id: number } }) {
    const { id } = params
    return (
        <main>
            <EditPost id={id as number}/>
        </main>
    )}
