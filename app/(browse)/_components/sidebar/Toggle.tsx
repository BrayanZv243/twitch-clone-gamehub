"use client";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export const Toggle = () => {
    const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);
    const [showLabel, setShowLabel] = useState(false);

    const [showArrows, setShowArrows] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowArrows(true);
        }, 200);
        setShowArrows(false);
    }, [collapsed]);

    useEffect(() => {
        if (!collapsed) {
            const timer = setTimeout(() => {
                setShowLabel(true);
            }, 300);

            return () => clearTimeout(timer);
        } else {
            setShowLabel(false); // Reset visibility when collapsed
        }
    }, [collapsed]);

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button
                            variant="ghost"
                            className={`h-auto p-2 transition-opacity duration-300 ease-in-out ${
                                showArrows ? "opacity-100" : "opacity-0"
                            }`}
                            onClick={onExpand}
                        >
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p
                        className={`h-4 w-full font-semibold text-primary transition-opacity duration-300 ${
                            showLabel ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        For you
                    </p>
                    <Hint label={label} side="right" asChild>
                        <Button
                            className={`h-auto p-2 ml-auto transition-opacity duration-300 ease-in-out ${
                                showArrows ? "opacity-100" : "opacity-0"
                            }`}
                            variant="ghost"
                            onClick={onCollapse}
                        >
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
};

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full ">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-6" />
        </div>
    );
};
