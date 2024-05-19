import useComment from "@/hooks/useComment";

const RecentComments = () => {
    const { commentError, comments, commentLoading } = useComment();

    return (
        <div className="bg-[#182237] p-5 mt-3 rounded-md">
            <h2 className="text-[#b7bac1] mb-3">Recent Comments</h2>
            <table className="text-xs table border-2 border-[#585f74] ">
                <thead className="text-sm text-center">
                    <tr className="">
                        <td className="p-2 w-[15%]  border border-[#585f74]">
                            Name
                        </td>
                        <td className="p-2 w-[40%]  border border-[#585f74]">
                            Comment
                        </td>
                        <td className="p-2 w-[35%]  border border-[#585f74]">
                            Post
                        </td>
                        <td className="p-2 w-[10%] ">Date</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border border-[#585f74] my-5">
                        <td className="p-2 border border-[#585f74] text-center">
                            Bolodeoku Taiwo
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="p-2 border border-[#585f74] text-center">
                            2 minutes ago
                        </td>
                    </tr>
                    <tr className="border border-[#585f74] my-5">
                        <td className="p-2 border border-[#585f74] text-center">
                            Bolodeoku Taiwo
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="p-2 border border-[#585f74] text-center">
                            2 minutes ago
                        </td>
                    </tr>
                    <tr className="border border-[#585f74] my-5">
                        <td className="p-2 border border-[#585f74] text-center">
                            Bolodeoku Taiwo
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="p-2 border border-[#585f74] text-center">
                            2 minutes ago
                        </td>
                    </tr>
                    <tr className="border border-[#585f74] my-5">
                        <td className="p-2 border border-[#585f74] text-center">
                            Bolodeoku Taiwo
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="p-2 border border-[#585f74] text-center">
                            2 minutes ago
                        </td>
                    </tr>
                    <tr className="border border-[#585f74] my-5">
                        <td className="p-2 border border-[#585f74] text-center">
                            Bolodeoku Taiwo
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="p-2 border border-[#585f74] text-center">
                            2 minutes ago
                        </td>
                    </tr>
                    <tr className="border border-[#585f74] my-5">
                        <td className="p-2 border border-[#585f74] text-center">
                            Bolodeoku Taiwo
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="p-2 border border-[#585f74] text-center">
                            2 minutes ago
                        </td>
                    </tr>
                    <tr className="border border-[#585f74] my-5">
                        <td className="p-2 border border-[#585f74] text-center">
                            Bolodeoku Taiwo
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="p-2 border border-[#585f74] text-center">
                            2 minutes ago
                        </td>
                    </tr>
                    <tr className="border border-[#585f74] my-5">
                        <td className="p-2 border border-[#585f74] text-center">
                            Bolodeoku Taiwo
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.
                        </td>
                        <td className="p-2 border border-[#585f74]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </td>
                        <td className="p-2 border border-[#585f74] text-center">
                            2 minutes ago
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RecentComments;
