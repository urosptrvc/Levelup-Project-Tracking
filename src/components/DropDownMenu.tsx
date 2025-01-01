"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import PopUp from "@/components/PopUp";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifier } from "@/components/ui/use-notifications";

const ActionsMenu = ({ shipId }: { shipId: number }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const queryClient = useQueryClient();
    const { notifyError, notifySuccess } = useNotifier();
    const isAdmin = session?.user?.role === "admin";

    const handleRowClick = (id: number) => {
        router.push(`/shipments/${id}`);
    };

    const deleteShipment = async (id: number) => {
        const res = await fetch(`/api/shipments/${id}`, { method: "DELETE" });
        if (!res.ok) {
            notifyError("Error", res.statusText);
            throw new Error(res.statusText);
        }
        return res.json();
    };

    const mutation = useMutation({
        mutationFn: deleteShipment,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["shipments"] });
            notifySuccess("Success", "Shipment deleted successfully");
            router.refresh();
        },
        onError: (error: unknown) => {
            notifyError("Error", "Failed to delete shipment");
            console.error("Delete shipment error:", error);
        },
    });

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Properties</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleRowClick(shipId)}
                    >
                        View shipment details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {isAdmin && (
                        <>
                            <DropdownMenuItem
                                className="text-red-600 cursor-pointer hover:bg-red-100"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    setIsModalOpen(true);
                                }}
                            >
                                Delete shipment
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <PopUp
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onClick1={() => mutation.mutate(shipId)}
                textTitle="Are you sure?"
                textDesc="Do you really want to delete this shipment? This action cannot be undone."
                btnfunction="Delete"
                isLoading={mutation.isPending}
            />
        </>
    );
};

export default ActionsMenu;