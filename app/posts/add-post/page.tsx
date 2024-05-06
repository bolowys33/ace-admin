"use client";

import InputField from "@/components/InputField";
import { Box, Container } from "@mui/material";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import './jodit-custom.css'; // Import your custom CSS file
import DOMPurify from 'dompurify';

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const cleanContent = DOMPurify.sanitize(content)

    

    const editor = useRef(null);
    const config = {
        height: "350px",
        backgroundColor: "black",
    }

    return (
        <div className="bg-[#182237] rounded-lg py-7 min-h-[520px] mt-20">
            <Container maxWidth="md" className="">
                <Box>
                    <h2 className="text-center font-bold text-3xl">Create a blog post</h2>
                    <form className="flex flex-col items-center md:w-[95%] my-6 mx-auto">
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
                            <JoditEditor
                                ref={editor}
                                config={config}
                                value={content}
                                onBlur={(newContent) =>
                                    setContent(newContent)
                                }
                                className="w-full bg-[#2e374a] rounded-lg text-black outline-none"
                            />
                        </div>
                        <button type="submit" className="py-2 px-5 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md">Add post</button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default AddPost;
