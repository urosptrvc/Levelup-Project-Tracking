"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useNotifier } from "@/components/ui/use-notifications";
import { usePathname } from "next/navigation";
import UploadLink from "@/components/UploadLink";
import Image from "next/image";
import PopUp from "./PopUp";
import { ThemeSwitcherBtn } from "@/components/ThemeSwitcherBtn";


const Navbar = () => {
    const { notifySuccess } = useNotifier();
    const pathname = usePathname();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const hiddenRoutes = ["/auth/login", "/auth/register"];
    if (hiddenRoutes.includes(pathname)) {
        return null;
    }

    const handleLogout = () => {
        setIsLoading(true);
        signOut({
            callbackUrl: "/auth/login",
        }).then(() => {
            notifySuccess("Success", "Logged out successfully!");
            setIsLoading(false)
        });
    };

    const openModal = () => setModalOpen(true);

    return (
        <>
            <nav className="border-b shadow sticky top-0 bg-inherit z-50">
                <div className="container mx-auto flex items-center py-4 px-6">

                    <div className="flex items-center space-x-3 flex-1">
                        <ThemeSwitcherBtn/>
                        <span className="text-sm">Change Theme</span>
                    </div>

                    <div className="flex justify-center items-center flex-1">
                        <Link href="/shipments" legacyBehavior>
                            <a className="flex flex-col items-center hover:opacity-90 transition-opacity">
                                <Image src="/favicon.ico" alt="Logo" width={50} height={50}/>
                                <h1 className="text-xl font-bold mt-2">The Track Meister</h1>
                            </a>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6 flex-1 justify-end">
                        <Link href="/shipments">
                            <Button variant="ghost" className="text-sm">
                                Overview
                            </Button>
                        </Link>
                        <UploadLink/>
                        <Button variant="destructive" onClick={openModal}>
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>
            <PopUp open={isModalOpen}
                   onOpenChange={setModalOpen}
                   onClick1={handleLogout}
                   textTitle={"Are you sure you want to log out?"}
                   textDesc={"This action cannot be undone.\n" +
                       "You will have to login again and will be redirected to login page."}
                   btnfunction={"Confirm"}
                   isLoading={isLoading}
            />
        </>
    );
};

export default Navbar;
