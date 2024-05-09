import Link from "next/link";
import Search from "./Search";
import usePosts from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
    const { posts, isFetching, error, getPosts } = usePosts();
    const [deletingPostIds, setDeletingPostIds] = useState<
        Record<string, boolean>
    >({});
    const [deletedPostId, setDeletedPostId] = useState<string | null>(null);

    useEffect(() => {
        if (deletedPostId) {
            getPosts();
            setDeletedPostId(null);
        }
    }, [deletedPostId, getPosts]);

    const handleDeletePost = async (id: string, url: string) => {
        const token = localStorage.getItem("token");

        setDeletingPostIds((prevState) => ({ ...prevState, [id]: true }));
        try {
            await axios.delete(`/api/posts/${url}`, {
                headers: {
                    Authorization: token,
                },
            });
            setDeletedPostId(id);
        } catch (error) {
            console.error("Error deleting attorney:", error);
        } finally {
            setDeletingPostIds((prevState) => ({
                ...prevState,
                [id]: false,
            }));
        }
    };

    if (error) {
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
                <table className="w-full mt-5">
                    <thead>
                        <tr>
                            <td className="px-2 pb-3 w-[50%]">Title</td>
                            <td className="px-2 pb-3 w-[15%]">Date added</td>
                            <td className="px-2 pb-3 w-[15%]">Comments</td>
                            <td className="px-2 pb-3 w-[20%]">Action</td>
                        </tr>
                    </thead>
                </table>
                <div className="grid place-items-center h-[70%]">
                    <h3 className="text-xl">
                        Error fetching posts, check your network and try
                        again.
                    </h3>
                </div>
            </div>
        );
    }

    if (isFetching) {
        return (
            <div className=" flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm h-[500px]">
                <div className="flex items-center justify-between">
                    <Search placeholder="Search for a post" />
                    <Link
                        href="/posts/add-post"
                        className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md">
                        Add new
                    </Link>
                </div>
                <div>
                    <table className="w-full my-5">
                        <thead>
                            <tr>
                                <td className="px-2 pb-3 w-[50%]">Title</td>
                                <td className="px-2 pb-3 w-[15%]">
                                    Date added
                                </td>
                                <td className="px-2 pb-3 w-[15%]">Comments</td>
                                <td className="px-2 pb-3 w-[20%]">Action</td>
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
                                    <td className="flex p-2 space-x-2">
                                        <div className="h-6 w-16 bg-gray-500 animate-pulse"></div>
                                        <div className="h-6 w-16 bg-gray-500 animate-pulse"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm h-[500px]">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for an post" />
                <Link
                    href="/posts/add-post"
                    className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md">
                    Add new
                </Link>
            </div>
            {!isFetching && posts?.length == 0 ? (
                <div className="grid place-items-center h-[70%]">
                <h3 className="place-self-center mt-[150px] text-xl">
                    No post found, click{" "}
                    <Link
                        href="/posts/add-post"
                        className="underline text-blue-500">
                        here
                    </Link>{" "}
                    to create new post.
                </h3>
                </div>
            ) : (
                <div>
                    <table className="w-full my-5">
                        <thead>
                            <tr>
                                <td className="px-2 pb-3 w-[50%]">Title</td>
                                <td className="px-2 pb-3 w-[15%]">
                                    Date added
                                </td>
                                <td className="px-2 pb-3 w-[15%]">Comments</td>
                                <td className="px-2 pb-3 w-[20%]">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {posts?.map((post) => (
                                <tr>
                                    <td className="p-2">
                                        <div className="flex items-center gap-2">
                                            {post.title}
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        {post.date_created.split("T")[0]}
                                    </td>
                                    <td className="p-2">10 comments</td>
                                    <td className="p-2 space-x-2">
                                        <Link
                                            href={`/posts/post/${post.post_url}`}>
                                            <button
                                                type="button"
                                                className="py-1 px-2 rounded-md bg-[teal] hover:bg-[#103131]">
                                                View
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeletePost(
                                                    post._id,
                                                    post.post_url
                                                )
                                            }
                                            disabled={deletingPostIds[post._id]}
                                            className="py-1 px-2 rounded-md bg-[crimson] hover:bg-[#521e28]">
                                            {deletingPostIds[post._id]
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Posts;
