import { Comment } from "@/hooks/useSinglePost";
import { Container } from "@mui/material";
import { FC } from "react";

interface CommentProps {
    comments?: Comment[];
}

const Comments: FC<CommentProps> = ({ comments }) => {
    return (
        <Container maxWidth="sm" className="mt-14">
            {comments?.length === 0 ? (
                <div className="grid place-items-center text-red-500 h-[250px]">
                    No comment found
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Comments
                    </h2>
                    <div className="space-y-4">
                        {comments?.map((comment) => (
                            <div
                                key={comment._id}
                                className="bg-[#2e374a] p-4 rounded-md">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-[#b7bac1]">
                                        {comment.author}
                                    </h3>
                                    <p className="text-[#b7bac1] text-sm">
                                        {new Date(
                                            comment.date_created
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <p className="">{comment.body}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Container>
    );
};

export default Comments;
