"use client";

import InputField from "@/components/InputField";
import { Box, Container, TextField } from "@mui/material";
import { useState } from "react";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="bg-[#182237] rounded-lg py-7">
            <Container maxWidth="sm" className="border ">
                <Box>
                    <h2 className="text-center">Create a blog post</h2>
                    <form className="flex flex-col items-center md:w-[80%] mx-auto">
                        <InputField
                            label="Post title"
                            placeholder="Enter post title"
                            name="title"
                            required
                        />
                        <div className="w-full">
                            <label htmlFor="content" className="text-left">
                                Post content
                            </label>
                            <textarea
                                name="content"
                                id="content"
                                cols={30}
                                rows={10}
                                required
                                className="w-full bg-[#2e374a] rounded-lg p-2 outline-none"
                            />
                        </div>
                        <button type="submit">Add post</button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default AddPost;
