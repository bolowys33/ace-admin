import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

export interface Post {
    _id: string;
    title: string;
    content: string;
    post_url: string;
    comments: string[];
    date_created: string;
}

interface PostResponse {
    success: boolean;
    data: Post[];
    message: string | null;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasMore: boolean;
    };
}

interface UsePosts {
    posts: Post[] | null;
    isFetching: boolean;
    error: string | null;
    getPosts: (page?: number, limit?: number, skip?: number) => Promise<void>;
    pagination: PostResponse["pagination"] | null;
}

const usePosts = (): UsePosts => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<
        PostResponse["pagination"] | null
    >(null);

    const getPosts = async (page = 1, limit = 8, skip = 0): Promise<void> => {
        setIsFetching(true);
        setError(null);
        try {
            const response: AxiosResponse<PostResponse> = await axios.get(
                `/api/posts?page=${page}&limit=${limit}&skip=${skip}`
            );
            if (response.data.success) {
                setPosts(response.data.data);
                setPagination(response.data.pagination);
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

    return { posts, isFetching, error, getPosts, pagination };
};

export default usePosts;
