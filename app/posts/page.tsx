"use client";

import Search from "@/components/Search";
import usePosts from "@/hooks/usePosts";
import Link from "next/link";

const Posts = () => {
    const { posts, isFetching, error } = usePosts();

    if (isFetching) {
        return (
            <div className="bg-[#182237] my-3 p-5 rounded-lg text-sm h-[500px]">
                <div className="flex items-center justify-between">
                    <div className="w-64 h-8 bg-gray-500 animate-pulse"></div>
                    <div className="w-24 h-8 bg-gray-500 animate-pulse"></div>
                </div>
                <table className="w-full my-5">
                    <thead>
                        <tr>
                            <td className="px-2 pb-3 h-8 bg-gray-500 animate-pulse"></td>
                            <td className="px-2 pb-3 h-8 bg-gray-500 animate-pulse"></td>
                            <td className="px-2 pb-3 h-8 bg-gray-500 animate-pulse"></td>
                            <td className="px-2 pb-3 h-8 bg-gray-500 animate-pulse"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }, (_, index) => (
                            <tr key={index}>
                                <td className="p-2">
                                    <div className="h-6 bg-gray-500 animate-pulse"></div>
                                </td>
                                <td className="p-2">
                                    <div className="h-6 bg-gray-500 animate-pulse"></div>
                                </td>
                                <td className="p-2">
                                    <div className="h-6 bg-gray-500 animate-pulse"></div>
                                </td>
                                <td className="p-2 space-x-2">
                                    <div className="h-6 w-16 bg-gray-500 animate-pulse"></div>
                                    <div className="h-6 w-16 bg-gray-500 animate-pulse"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

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
                    {posts.map((post) => (
                        <tr>
                            <td className="p-2">
                                <div className="flex items-center gap-2">
                                    {post.title}
                                </div>
                            </td>
                            <td className="p-2">{post.date_created}</td>
                            <td className="p-2">10 comments</td>
                            <td className="p-2 space-x-2">
                                <Link href={`/posts/post/${post.post_url}`}>
                                    <button
                                        type="button"
                                        className="py-1 px-2 rounded-md bg-[teal] hover:bg-[#103131]">
                                        View
                                    </button>
                                </Link>
                                <button
                                    type="button"
                                    className="py-1 px-2 rounded-md bg-[crimson] hover:bg-[#57202b]">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Posts;
