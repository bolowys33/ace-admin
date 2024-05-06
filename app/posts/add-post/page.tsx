"use client";

import InputField from "@/components/InputField";
import { Box, Container } from "@mui/material";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
// import 'jodit-react/build/jodit.min.css';
import './jodit-custom.css'; // Import your custom CSS file

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    

    const editor = useRef(null);
    const config = {
        height: "350px",
        backgroundColor: "black",
    }

    return (
        <div className="bg-[#182237] rounded-lg py-7 min-h-[520px] mt-20">
            <Container maxWidth="md" className="border ">
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
                        <button type="submit">Add post</button>
                    </form>
                    <p>{content}</p>
                </Box>
            </Container>
        </div>
    );
};

export default AddPost;
