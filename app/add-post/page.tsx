"use client"

import { Box, Container, TextField } from "@mui/material";
import { useState } from "react";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <Container maxWidth="sm" className="border text-center">
                <Box>
                    <h2>Create a blog post</h2>
                    <form>
                    <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="outlined-basic"
                                label="Post Title"
                                type="text"
                                autoFocus={false}
                                className="mb-4 text-gray-700 rounded bg-white"
                            />
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default AddPost;
