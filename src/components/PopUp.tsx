import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadSpinner from "@/components/LoadSpinner";

type Props = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    onClick1: () => void;
    textTitle: string;
    textDesc: string;
    btnfunction: string;
    isLoading: boolean;
};

const PopUp = ({
                   open,
                   onOpenChange,
                   onClick1,
                   textTitle,
                   textDesc,
                   btnfunction,
                   isLoading,
               }: Props) => {
    const handleDestructiveClick = () => {
        onClick1();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <LoadSpinner isLoading={isLoading}>
                    <DialogHeader>
                        <DialogTitle>{textTitle}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{textDesc}</DialogDescription>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDestructiveClick}
                            disabled={isLoading}
                        >
                            {btnfunction}
                        </Button>
                    </DialogFooter>
                </LoadSpinner>
            </DialogContent>
        </Dialog>
    );
};

export default PopUp;
