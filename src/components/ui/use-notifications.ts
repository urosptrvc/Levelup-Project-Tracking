"use client"

import { useToast } from "./use-toast"


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



    return {
        notifyError,
        notifySuccess,
    }
}
