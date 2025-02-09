"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import { useNotifier } from "@/components/ui/use-notifications";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import LoadSpinner from "@/components/LoadSpinner";

const RegisterPage = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { notifyError, notifySuccess } = useNotifier();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name, role }),
        });
        const data = await res.json();
        setIsLoading(false);
        if (!res.ok) {
            notifyError("Error", data.error);
            return;
        }

        notifySuccess("Success", "Register success");
        router.push("/auth/login");
    };

    return (
        <AuthCard
            title="Register"
            footerLink={{ href: "/auth/login", text: "Already have an account? Click here to login." }}
        >
            <LoadSpinner isLoading={isLoading}>
            <AuthForm
                fields={[
                    {
                        type: "text",
                        placeholder: "Name",
                        value: name,
                        setValue: setName,
                    },
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
                extraFields={
                    <Select onValueChange={setRole}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                    </Select>
                }
                onSubmitAction={handleRegister}
                submitText="Register"
            />
            </LoadSpinner>
        </AuthCard>
    );
}

export default RegisterPage;
