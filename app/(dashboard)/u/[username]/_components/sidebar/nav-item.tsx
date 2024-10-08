"use client";

import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface NavItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    isActive: boolean;
}

export const NavItem = ({
    icon: Icon,
    label,
    href,
    isActive,
}: NavItemProps) => {
    const { collapsed } = useCreatorSidebar((state) => state);
    const [showLabel, setShowLabel] = useState(false);
    const [showIcon, setShowIcon] = useState(false);

    useEffect(() => {
        if (!collapsed) {
            const timer = setTimeout(() => {
                setShowLabel(true);
                setShowIcon(true);
            }, 300);

            return () => clearTimeout(timer);
        } else {
            setShowLabel(false);
        }
    }, [collapsed]);

    return (
        <Button
            asChild
            variant="ghost"
            className={cn("w-full h-12 justify-start", isActive && "bg-accent")}
        >
            <Link href={href}>
                <div className="flex items-center gap-x-4">
                    <Icon
                        className={cn(
                            "h-[21px] w-[21px] transition-opacity duration-300 ease-in-out",
                            collapsed ? "mr-0" : "mr-2",
                            showIcon ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {!collapsed && (
                        <span
                            className={cn(
                                "transition-opacity duration-300 ease-in-out",
                                showLabel ? "opacity-100" : "opacity-0"
                            )}
                        >
                            {label}
                        </span>
                    )}
                </div>
            </Link>
        </Button>
    );
};

export const NavItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
            <div className="flex-1 hidden lg:block">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};
