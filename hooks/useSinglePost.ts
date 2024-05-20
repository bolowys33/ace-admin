import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

export interface Comment {
    _id: string;
    author: string;
    body: string;
    date_created: string;
}

interface Post {
    _id: string;
    title: string;
    content: string;
    post_url: string;
    date_created: string;
    comments: Comment[];
}

interface PostResponse {
    success: boolean;
    data: Post;
    message: string | null;
}

const useSinglePost = (url: string) => {
    const [post, setPost] = useState<Post | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getPost = async (): Promise<void> => {
        setIsFetching(true);
        setError(null);

        try {
            const response: AxiosResponse<PostResponse> = await axios.get(
                `/api/posts/${url}`
            );
            if (response.data.success) {
                setPost(response.data.data);
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError("An error occurred while fetching post.");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (url) {
            getPost();
        } else {
            setIsFetching(false);
        }
    }, [url]);

    return { post, isFetching, error };
};

export default useSinglePost;
