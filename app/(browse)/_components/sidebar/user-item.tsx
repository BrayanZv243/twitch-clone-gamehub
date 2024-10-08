"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { LiveBadge } from "@/components/live-badge";
import { useState, useEffect } from "react";
import { Hint } from "@/components/hint";

interface UserItemProps {
    username: string;
    imageUrl: string;
    isLive?: boolean;
}

export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
    const pathName = usePathname();
    const { collapsed } = useSidebar((state) => state);
    const href = `/${username}`;
    const isActive = pathName === href;
    const [showUsername, setShowUsername] = useState(false);
    const [showLiveBadge, setShowLiveBadge] = useState(false);

    useEffect(() => {
        if (!collapsed) {
            const timer = setTimeout(() => {
                setShowUsername(true);
                setShowLiveBadge(isLive!); // Show live badge if the user is live
            }, 300);
            return () => {
                clearTimeout(timer);
                setShowUsername(false);
                setShowLiveBadge(false);
            };
        } else {
            setShowUsername(false);
            setShowLiveBadge(false);
        }
    }, [collapsed, isLive]);

    return (
        <Button
            asChild
            variant="ghost"
            className={cn("w-full h-full", isActive && "bg-accent")}
        >
            <Link href={href}>
                {collapsed ? (
                    <Hint label={username} side="right" asChild>
                        <div className="flex items-center w-full gap-x-4 ">
                            <UserAvatar
                                imageUrl={imageUrl}
                                username={username}
                                isLive={isLive}
                            />
                        </div>
                    </Hint>
                ) : (
                    <div className="flex items-center w-full gap-x-4 ">
                        <UserAvatar
                            imageUrl={imageUrl}
                            username={username}
                            isLive={isLive}
                        />
                        <span
                            className={`flex justify-start w-screen truncate transition-opacity duration-300 ease-in-out ${
                                showUsername ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            {username}
                        </span>
                        {showLiveBadge && (
                            <LiveBadge
                                className={`ml-auto transition-opacity duration-300 ease-in-out ${
                                    showLiveBadge ? "opacity-100" : "opacity-0"
                                }`}
                            />
                        )}
                    </div>
                )}
            </Link>
        </Button>
    );
};

export const UserItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};
