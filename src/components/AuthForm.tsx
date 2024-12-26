"use client";

import {FormEvent, ReactNode} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AuthFormProps {
    fields: {
        type: string;
        placeholder: string;
        value: string;
        setValue: (value: string) => void;
    }[];
    onSubmit: (e: FormEvent) => void;
    submitText: string;
    extraFields?: ReactNode;
}

export function AuthForm({ fields, onSubmit, submitText, extraFields }: AuthFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {fields.map((field, index) => (
                <Input
                    key={index}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                />
            ))}
            {extraFields}
            <Button type="submit" className="w-full">
                {submitText}
            </Button>
        </form>
    );
}