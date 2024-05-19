import useComment from "@/hooks/useComment";

const RecentComments = () => {
    const { comments, commentLoading, commentError } = useComment();

    return (
        <div className="bg-[#182237] p-5 mt-3 rounded-md">
            <h2 className="text-[#b7bac1] mb-3">Recent Comments</h2>
            {commentLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
                </div>
            ) : commentError ? (
                <div className="grid place-items-center text-red-500 h-[250px]">
                    {commentError}
                </div>
            ) : (
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
                        {comments?.map((comment) => (
                            <tr
                                key={comment._id}
                                className="border border-[#585f74] my-5">
                                <td className="p-2 border border-[#585f74] text-center">
                                    {comment.author}
                                </td>
                                <td className="p-2 border border-[#585f74]">
                                    {comment.body}
                                </td>
                                <td className="p-2 border border-[#585f74]">
                                    {comment.post.title}
                                </td>
                                <td className="p-2 border border-[#585f74] text-center">
                                    2 minutes ago
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RecentComments;
