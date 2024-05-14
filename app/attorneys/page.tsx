"use client";

import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
import useAuthorization from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Attorneys = lazy(() => import("@/components/Attorneys"));

const AttorneysPage = () => {
    const isAuthenticated = useAuthorization();
    const router = useRouter();

    if (!isAuthenticated) {
        // Redirect to the login page
        router.push("/login");
        return null; // Optionally, render a loading indicator while redirecting
    }

    return (
        <Suspense fallback={<Loading />}>
            <Attorneys />
        </Suspense>
    );
};

export default AttorneysPage;
