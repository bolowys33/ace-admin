import useSinglePost from "@/hooks/useSinglePost";
import { Container } from "@mui/material";
import Link from "next/link";
import ReactHtmlParser from "html-react-parser";
import Comments from "./Comments";

const SinglePost = ({ url }: { url: string }) => {
    const { post, error, isFetching } = useSinglePost(url);

    if (isFetching) {
        return (
            <Container
                maxWidth="md"
                className="space-y-4 font-poppins text-justify font-medium p-5">
                <div className="text-center my-5 space-y-2">
                    <div className="h-10 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="h-4 bg-gray-300 animate-pulse w-48 mx-auto rounded-md"></div>
                </div>
                <div className="h-16 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-16 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-16 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-10 bg-gray-300 animate-pulse rounded-md"></div>
            </Container>
        );
    }

    if (error) {
        return (
            <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[500px] w-full">
                <h3 className="place-self-center text-xl">
                    Error fetching post, check your network and try again
                </h3>
            </div>
        );
    }

    return (
        <div className="bg-[#182237] my-3 p-5 rounded-lg min-h-[500px]">
            {!isFetching && !post ? (
                <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[500px] w-full">
                    <h3 className="place-self-center text-xl">
                        Post not found, click{" "}
                        <Link href="/posts" className="underline text-blue-500">
                            here
                        </Link>{" "}
                        to view all posts
                    </h3>
                </div>
            ) : (
                <div className="flex flex-col items-end">
                    <Link
                        href={`/posts/update-post/${post?.post_url}`}
                        className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white rounded-md mb-4">
                        Update Post
                    </Link>
                    <Container
                        maxWidth="md"
                        className="space-y-4 font-poppins text-justify font-medium">
                        <div className="text-center my-5 space-y-2">
                            <h1 className="font-bold text-2xl md:text-4xl ">
                                {post?.title}
                            </h1>
                            <p className="text-[#b7bac1] text-sm">
                                {post?.date_created} | 15 comments
                            </p>
                        </div>
                        <div className="space-y-3 list-style">
                            {ReactHtmlParser(post?.content as string)}
                        </div>
                    </Container>
                    <Comments />
                </div>
            )}
        </div>
    );
};

export default SinglePost;
