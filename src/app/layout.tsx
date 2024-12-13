// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
    title: "Shipments App",
    description: "Next.js + Prisma + Toast example",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        {/* Toast mora biti na nivou root layout-a */}
        <Toaster />
        {children}
        </body>
        </html>
    )
}
