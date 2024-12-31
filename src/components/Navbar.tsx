"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useNotifier } from "@/components/ui/use-notifications";
import { usePathname } from "next/navigation";
import UploadLink from "@/components/UploadLink";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { ThemeSwitcherBtn } from "@/components/ThemeSwitcherBtn";

const Navbar = () => {
    const { notifySuccess } = useNotifier();
    const pathname = usePathname();
    const [isModalOpen, setModalOpen] = useState(false);

    const hiddenRoutes = ["/auth/login", "/auth/register"];
    if (hiddenRoutes.includes(pathname)) {
        return null;
    }

    const handleLogout = () => {
        signOut({
            callbackUrl: "/auth/login",
        }).then(() => {
            notifySuccess("Success", "Logged out successfully!");
        });
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <nav className="border-b shadow">
                <div className="container mx-auto flex items-center py-4 px-6">
                    {/* Left Section */}
                    <div className="flex items-center space-x-3">
                        <ThemeSwitcherBtn/>
                        <span className="text-sm">Change Theme</span>
                    </div>

                    {/* Center Section */}
                    <div className="flex flex-grow justify-center items-center flex-col">
                        <Link href="/shipments" legacyBehavior>
                            <a className="flex flex-col items-center hover:opacity-90 transition-opacity">
                                <Image src="/favicon.ico" alt="Logo" width={50} height={50}/>
                                <h1 className="text-xl font-bold mt-2">The Track Meister</h1>
                            </a>
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-6">
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
            <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to log out?</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        This action cannot be undone.
                        You will have to login again and will be redirected to login page.
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="ghost" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Navbar;
