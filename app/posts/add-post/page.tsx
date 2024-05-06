"use client";

import InputField from "@/components/InputField";
import { Box, Container, TextField } from "@mui/material";
import JoditEditor from "jodit-react";
import { useState } from "react";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="bg-[#182237] rounded-lg py-7 min-h-[520px] mt-20">
            <Container maxWidth="sm" className="border ">
                <Box>
                    <h2 className="text-center">Create a blog post</h2>
                    <form className="flex flex-col items-center md:w-[95%] mx-auto">
                        <InputField
                            label="Post title *"
                            placeholder="Enter post title"
                            name="title"
                            required
                        />
                        <div className="w-full space-y-3 my-4">
                            <label htmlFor="content" className="text-left p-2">
                                Post content *
                            </label>
                            {/* <textarea
                                name="content"
                                id="content"
                                cols={30}
                                rows={10}
                                required
                                className="w-full bg-[#2e374a] rounded-lg p-2 outline-none"
                            /> */}
                            <JoditEditor
                                value={content}
                                onChange={(newContent) =>
                                    setContent(newContent)
                                }
                                className="w-full bg-[#2e374a] rounded-lg text-black outline-none"
                            />
                        </div>
                        <button type="submit">Add post</button>
                    </form>
                    <p>{content}</p>
                </Box>
            </Container>
        </div>
    );
};

export default AddPost;
