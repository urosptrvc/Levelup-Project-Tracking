"use client";

import {FormEvent, useState} from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/AuthCard";
import { AuthForm } from "@/components/AuthForm";
import { useNotifier } from "@/components/ui/use-notifications";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { notifyError, notifySuccess } = useNotifier();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name, role }),
        });
        const data = await res.json();
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
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Administrator</option>
                    </select>
                }
                onSubmit={handleRegister}
                submitText="Register"
            />
        </AuthCard>
    );
}