import Search from "@/components/Search";
import usePosts from "@/hooks/usePosts";
import Link from "next/link";

const Posts = () => {
    const { posts, isFetching, error } = usePosts();

    return (
        <div className="bg-[#182237] my-3 p-5 rounded-lg text-sm h-[500px]">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a post" />
                <Link
                    href="/posts/add-post"
                    className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md">
                    Add new
                </Link>
            </div>
            <table className="w-full my-5">
                <thead>
                    <tr>
                        <td className="px-2 pb-3">Title</td>
                        <td className="px-2 pb-3">Date added</td>
                        <td className="px-2 pb-3">Comments</td>
                        <td className="px-2 pb-3">Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2">
                            <div className="flex items-center gap-2">
                                First Blog; Introduction to our blog, the first
                                blog post created
                            </div>
                        </td>
                        <td className="p-2">20-12-2024</td>
                        <td className="p-2">10 comments</td>
                        <td className="p-2 space-x-2">
                            <button
                                type="button"
                                className="py-1 px-2 rounded-md bg-[teal]">
                                View
                            </button>
                            <button
                                type="button"
                                className="py-1 px-2 rounded-md bg-[crimson]">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Posts;
