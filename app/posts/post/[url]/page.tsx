"use client";

import React, { lazy, Suspense } from "react";
import LoadingPost from "@/components/LoadingPost";
import useAuthorization from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const SinglePost = lazy(() => import("@/components/SinglePost"));

const PostPage = ({ params }: { params: { url: string } }) => {
    const { isAuthenticated, isLoading } = useAuthorization();
    const router = useRouter();

    if (!isAuthenticated && !isLoading) {
        router.push("/login");
        return null;
    }

    const { url } = params;

    return (
        <Suspense fallback={<LoadingPost />}>
            <SinglePost url={url} />
        </Suspense>
    );
};

export default PostPage;
