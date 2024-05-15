"use client";

import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
import useAuthorization from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Posts = lazy(() => import("@/components/Posts"));

const PostsPage = () => {
    const { isAuthenticated, isLoading } = useAuthorization();
    const router = useRouter();

    if (!isAuthenticated && !isLoading) {
        router.push("/login");
        return null;
    }

    return (
        <Suspense fallback={<Loading />}>
            <Posts />
        </Suspense>
    );
};

export default PostsPage;
