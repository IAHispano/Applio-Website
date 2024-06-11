import DiscoverModels from "@/components/models/discover";
import { Suspense } from "react";

export default function Models() {
    return (
        <main className="md:min-h-[80svh] flex justify-center items-center mx-auto">
            <Suspense>
            <DiscoverModels />
            </Suspense>
        </main>
    )
}