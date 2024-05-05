"use client"

import InputField from "@/components/InputField";
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
                    <InputField label="Post title" placeholder="Enter post title" name="title" required/>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default AddPost;
