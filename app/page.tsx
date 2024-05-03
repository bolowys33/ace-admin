import Card from "@/components/Card";
import RecentComments from "@/components/RecentComments";

const Dashboard = () => {
    return (
        <div className="mt-3">
            <div className="flex justify-between gap-5">
                <Card title="Total Posts" count={500} />
                <Card title="Total Post Impressions" count={500} />
                <Card title="Monthly Impressions" count={500} details="50% compare to last month" />
            </div>
            <RecentComments />
        </div>
    );
};

export default Dashboard;
