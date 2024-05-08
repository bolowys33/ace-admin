"use client";

import React, { lazy, Suspense } from "react";
import LoadingPost from "@/components/LoadingPost";

const SinglePost = lazy(() => import("@/components/SinglePost"));

const PostPage = ({ params }: { params: { url: string } }) => {
    const { url } = params;

    return (
        <Suspense fallback={<LoadingPost />}>
            <SinglePost url={url} />
        </Suspense>
    );
};

export default PostPage;
