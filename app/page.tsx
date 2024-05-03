import Card from "@/components/Card";

const Dashboard = () => {
    return (
        <div className="mt-5">
            <div className="flex justify-between gap-5">
                <Card title="Total Posts" count={500} />
                <Card title="Total Post Impressions" count={500} />
                <Card title="Monthly Impressions" count={500} compare="50% compare to last month" />
            </div>
        </div>
    );
};

export default Dashboard;
