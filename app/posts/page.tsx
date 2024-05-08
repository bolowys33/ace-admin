"use client";

import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const Posts = lazy(() => import("@/components/Posts"));

const PostsPage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Posts />
        </Suspense>
    );
};

export default PostsPage;
