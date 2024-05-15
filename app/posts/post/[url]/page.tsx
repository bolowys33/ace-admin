"use client";

import React, { lazy, Suspense } from "react";
import LoadingPost from "@/components/LoadingPost";
import useAuthorization from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const SinglePost = lazy(() => import("@/components/SinglePost"));

const PostPage = ({ params }: { params: { url: string } }) => {
    const isAuthenticated = useAuthorization();
    const router = useRouter();

    if (!isAuthenticated) {
        // Redirect to the login page
        router.push("/login");
        return null; // Optionally, render a loading indicator while redirecting
    }

    const { url } = params;

    return (
        <Suspense fallback={<LoadingPost />}>
            <SinglePost url={url} />
        </Suspense>
    );
};

export default PostPage;
