import Card from "@/components/Card";

const Dashboard = () => {
    return (
        <div className="mt-5">
            <div className="flex justify-between gap-5">
                <Card title="Total Posts" count={500} />
                <Card title="Posts" count={500} />
                <Card title="Posts" count={500} />
            </div>
        </div>
    );
};

export default Dashboard;
