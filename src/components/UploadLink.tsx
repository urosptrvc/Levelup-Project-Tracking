"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function UploadLink() {
    const { data: session } = useSession();

    const isAdmin = session?.user?.role === "admin";

    if (!isAdmin) {
        return null;
    }

    return (
        <Link href="/shipments/upload">
            <Button variant="ghost" className="text-sm">
                Upload
            </Button>
        </Link>
    );
}
