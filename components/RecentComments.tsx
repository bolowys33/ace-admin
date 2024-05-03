const RecentComments = () => {
    return (
        <div className="bg-[#182237] p-5 mt-3 rounded-md">
            <h2 className="text-[#b7bac1] mb-3">Recent Comments</h2>
            <table className="text-xs table">
                <thead  className="text-sm text-center">
                    <tr className="">
                        <td className="p-2 w-[20%]">Name</td>
                        <td className="p-2 w-[35%]">Comment</td>
                        <td className="p-2 w-[35%]">Post</td>
                        <td className="p-2 w-[10%]">Date</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-row">
                        <td className="px-2 text-center" >Bolodeoku Taiwo</td>
                        <td className="px-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="px-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="px-2 text-center">2 minutes ago</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RecentComments;
