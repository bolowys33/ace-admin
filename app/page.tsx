"use client"

import Card from "@/components/Card";
import ImpressionChart from "@/components/ImpressionChart";
import RecentComments from "@/components/RecentComments";
import useAuthorization from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const Dashboard = () => {
    const { isAuthenticated, isLoading } = useAuthorization();
  const router = useRouter();

  if (!isAuthenticated && !isLoading) {
    router.push("/login");
    return null;
  }

    return (
        <div className="mt-3">
            <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-5">
                <Card title="Total Posts" count={500} />
                <Card title="Total Post Impressions" count={500} />
                <Card title="Monthly Impressions" count={500} details="50% compare to last month" />
            </div>
            <ImpressionChart />
            <RecentComments />
        </div>
    );
};

export default Dashboard;
