"use client"

import { useToast } from "./use-toast"


export function useNotifier() {
    const { toast } = useToast()

    function notifyError(title: string, description?: string) {
        toast({
            variant: "destructive",
            title,
            description,
        })
    }

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
