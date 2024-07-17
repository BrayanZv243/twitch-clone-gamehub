"use client";

import { IUser } from "@/app/models/IUser";
import { IFollow } from "@/app/models/IFollow";
import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";
import { useEffect, useState } from "react";

interface FollowingProps {
    data: (IFollow & { following: IUser })[];
}

export const Following = ({ data }: FollowingProps) => {
    const { collapsed } = useSidebar((state) => state);
    const [showLabel, setShowLabel] = useState(false);

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
    if (!data.length) {
        return null;
    }

    return (
        <div>
            <div className="pl-6 mb-2">
                <p
                    className={`text-sm w-full text-muted-foreground transition-opacity duration-300 mb-4 ${
                        showLabel ? "opacity-100" : "opacity-0"
                    }`}
                >
                    Following
                </p>
            </div>
            <ul className="space-y-2 px-2">
                {data.map((follow) => (
                    <UserItem
                        key={follow.following.id}
                        username={follow.following.username}
                        imageUrl={follow.following.imageUrl}
                    />
                ))}
            </ul>
        </div>
    );
};

export const FollowingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    );
};
