"use client";

import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
import useAuthorization from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Attorneys = lazy(() => import("@/components/Attorneys"));

const AttorneysPage = () => {
    const { isAuthenticated, isLoading } = useAuthorization();
    const router = useRouter();

    if (!isAuthenticated && !isLoading) {
        router.push("/login");
        return null;
    }

    return (
        <Suspense fallback={<Loading />}>
            <Attorneys />
        </Suspense>
    );
};

export default AttorneysPage;
