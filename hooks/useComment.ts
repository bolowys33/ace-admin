import { useState, useEffect } from "react";

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
            const response = await fetch("/api/comments");
            const data = await response.json();

            if (data.success) {
                setComments(data.data);
            } else {
                setCommentError(data.message);
            }
        } catch (error) {
            setCommentError("An error occurred while fetching comments.");
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
