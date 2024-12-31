import { ReactNode } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

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
        <div className="flex items-center justify-center min-h-screen" >
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex justify-center mb-4 " >
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
            </Card>
        </div>
    );
};
export default AuthCard;

