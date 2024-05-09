"use client";

import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const Attorneys = lazy(() => import("@/components/Attorneys"));

const AttorneysPage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Attorneys />
        </Suspense>
    );
};

export default AttorneysPage;
