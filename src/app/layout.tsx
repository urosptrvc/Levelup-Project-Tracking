// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
    title: "The Track Meister",
    description: "Levelup Project Tracking Mapping Data",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Toaster />
        {children}
        </body>
        </html>
    )
}
