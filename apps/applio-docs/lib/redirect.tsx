"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function redirectComponent() {
    const path = usePathname();
    useEffect(() => {
        if (path === "/") {
            window.location.href = '/applio';
        }
    }, [path]);

    return <></>;
}