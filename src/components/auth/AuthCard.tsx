import { ReactNode } from "react";
import Image from "next/image";
import { CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
    title: string;
    children: ReactNode;
    footerLink: {
        href: string;
        text: string;
    }
};

const AuthCard = ({ title, children, footerLink }: Props) => {
    return (
        <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md rounded-xl border bg-card/50 p-6 shadow-lg backdrop-blur-[12px]"
            >
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <Image src="/favicon.ico" alt="Logo" width={50} height={50} />
                        </div>
                        <CardTitle className="text-center">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                    <CardFooter className="flex items-center justify-center">
                        <Link href={footerLink.href} className="text-blue-500 text-sm">
                            {footerLink.text}
                        </Link>
                    </CardFooter>
            </motion.div>
        </div>
    );
};

export default AuthCard;
