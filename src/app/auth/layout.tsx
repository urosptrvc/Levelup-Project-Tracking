"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Package, PackageCheck, PackageSearch, Truck } from "lucide-react";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            {/* Animated Icons */}
            <div className="fixed inset-0 overflow-hidden">
                <motion.div
                    initial={{x: -100, opacity: 0}}
                    animate={{
                        x: ["-100%", "200%"],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[20%] flex items-center gap-32"
                >
                    <Truck className="h-12 w-12 text-primary/20"/>
                    <Package className="h-8 w-8 text-primary/15"/>
                    <PackageCheck className="h-10 w-10 text-primary/20"/>
                </motion.div>
                <motion.div
                    initial={{x: -100, opacity: 0}}
                    animate={{
                        x: ["-100%", "200%"],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 5
                    }}
                    className="absolute top-[60%] flex items-center gap-40"
                >
                    <PackageSearch className="h-10 w-10 text-secondary/20"/>
                    <Package className="h-12 w-12 text-secondary/15"/>
                    <Truck className="h-8 w-8 text-secondary/20"/>
                </motion.div>
            </div>
            {children}
            {/* Background Pattern */}
            <div
                className="fixed inset-0 z-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.857 8.485 15.272 9.9l7.9-7.9h-.83zm5.657 0L19.514 8.485 20.93 9.9l8.485-8.485h-.485zM3.715 0L0 3.715l1.414 1.414L8.485 0H3.715zm10.285 0L6.485 6.485 7.9 7.9 13.5 2.299 14.914.885l-1.414-1.414L13.5 0h.5zM6.485 0L5.07 1.415 6.485 2.829l1.414-1.414L6.485 0zM0 5.373l1.414 1.415L5.071 3.13 3.657 1.715 0 5.373zm4.243 4.242l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414zm5.656 5.657l1.415 1.414 1.414-1.414-1.414-1.414-1.415 1.414zM0 0h.5L0 .5V0zm60 0v.5L59.5 0H60zm0 60h-.5l.5-.5V60zm-60 0v-.5l.5.5H0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                }}
            />
        </div>
    );
}

export default Layout;
