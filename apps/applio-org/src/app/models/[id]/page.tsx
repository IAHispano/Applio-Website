"use client"

import { redirect } from "next/navigation";
import { useEffect } from "react";

// Remove for local development
export const runtime = "edge";

export default function ModelPage({ params }: Readonly<{ params: { id: string } }>) {
    const { id } = params

    useEffect(() => {
        if (id) {
            redirect(`/models?id=${id}`)
        } else {
            redirect("/not-found")
        }
    }, [id])

	return <div className="flex justify-center items-center mx-auto text-xs text-neutral-300 min-h-[80svh]">Redirecting...</div>;
}