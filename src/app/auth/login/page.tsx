"use client";

import {FormEvent, useEffect, useState} from "react";
import { signIn } from "next-auth/react";
import AuthCard from "@/components/AuthCard";
import AuthForm from "@/components/AuthForm";
import { useNotifier } from "@/components/ui/use-notifications";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";


const LoginPage = () =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { notifyError, notifySuccess } = useNotifier();
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/shipments");
        }
    }, [status, router]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            notifyError("Error", result.error);
        } else {
            notifySuccess("Success", "Login successful");
            router.push("/shipments");
        }
    };

    return (
        <AuthCard
            title="Login"
            footerLink={{ href: "/auth/register", text: "Don't have an account? Click here to register." }}
        >
            <AuthForm
                fields={[
                    {
                        type: "email",
                        placeholder: "Email",
                        value: email,
                        setValue: setEmail,
                    },
                    {
                        type: "password",
                        placeholder: "Password",
                        value: password,
                        setValue: setPassword,
                    },
                ]}
                onSubmitAction={handleLogin}
                submitText="Login"
            />
        </AuthCard>
    );
}

export default LoginPage;

