import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface Comment {
    _id: string;
    author: string;
    body: string;
    post: { title: string };
}

interface CommentResponse {
    success: boolean;
    data: Comment[];
    message: string | null;
}

const useComment = () => {
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentError, setCommentError] = useState<string | null>(null);

    const getComments = async () => {
        setCommentLoading(true);
        setCommentError(null);

        try {
            const response: AxiosResponse<CommentResponse> = await axios.get(
                "/api/comments"
            );
            if (response.data.success) {
                setComments(response.data.data);
            } else {
                setCommentError(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setCommentError(error.message);
            } else {
                setCommentError("An error occurred while fetching comments.");
            }
        } finally {
            setCommentLoading(false);
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    return { comments, commentLoading, commentError };
};

export default useComment;
