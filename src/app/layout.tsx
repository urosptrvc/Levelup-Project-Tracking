import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import Navbar from "@/components/Navbar";
import Providers from "@/app/providers";

export const metadata: Metadata = {
    title: "The Track Meister",
    description: "Levelup Project Tracking Mapping Data",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Toaster />
                    <Providers>
                        <Navbar />
                            <main>{children}</main>
                    </Providers>
            </body>
        </html>
    );
}