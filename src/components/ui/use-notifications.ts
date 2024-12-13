"use client"

import { useToast } from "./use-toast"

// Definišemo interface za parametre
interface ToastParams {
    title: string
    description?: string
}

export function useNotifier() {
    const { toast } = useToast()

    // npr. destructive toast za greške
    function notifyError(title: string, description?: string) {
        toast({
            variant: "destructive",
            title,
            description,
        })
    }

    // default toast za uspele radnje
    function notifySuccess(title: string, description?: string) {
        toast({
            variant: "default",
            title,
            description,
        })
    }

    // ako treba info/neutral varianta
    function notifyInfo(title: string, description?: string) {
        toast({
            variant: "default",
            title,
            description,
        })
    }


    return {
        notifyError,
        notifySuccess,
        notifyInfo,
    }
}
