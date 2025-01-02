import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import React from "react";

const UploadLink = () => {
    const {data: session} = useSession();

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

export const UserTag = () => {
    const {data: session} = useSession();

    const username = session?.user?.name || "Guest";
    const rolename = session?.user?.role || "N/A";

    return (
        <p className="text-sm pt-1">
            <span className="font-bold">User:</span> {username} -
            <span className="font-bold"> Role:</span> {rolename}
        </p>
    );
};

export default UploadLink;
