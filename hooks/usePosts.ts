import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

interface Post {
    _id: string;
    title: string;
    content: string;
    post_url: string;
    date_created: string;
}

interface PostResponse {
    success: boolean;
    data: Post[];
    message: string | null;
}

const usePosts = () => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getPosts = async (): Promise<void> => {
        setIsFetching(true);
        setError(null);

        try {
            const response: AxiosResponse<PostResponse> = await axios.get(
                "/api/posts"
            );
            if (response.data.success) {
                setPosts(response.data.data);
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError("An error occurred while fetching posts.");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return { posts, isFetching, error, getPosts };
};

export default usePosts;
