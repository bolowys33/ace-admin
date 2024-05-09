import { Container } from "@mui/material";

const Comments = () => {
    const comments = [
        {
            id: 1,
            author: "John Doe",
            content: "Great post!",
            date: "2023-05-09T10:30:00Z",
        },
        {
            id: 2,
            author: "Jane Smith",
            content: "Interesting insights!",
            date: "2023-05-09T11:45:00Z",
        },
    ];

    return (
        <Container maxWidth="sm" className="mt-14">
            <h2 className="text-xl font-bold mb-4 text-center">Comments</h2>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-[#2e374a] p-4 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-[#b7bac1]">{comment.author}</h3>
                            <p className="text-[#b7bac1] text-sm">
                                {new Date(comment.date).toLocaleString()}
                            </p>
                        </div>
                        <p className="">{comment.content}</p>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Comments;
