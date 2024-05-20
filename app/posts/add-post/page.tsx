"use client";

import InputField from "@/components/InputField";
import { Alert, Box, Container } from "@mui/material";
import JoditEditor from "jodit-react";
import { ChangeEvent, useRef, useState } from "react";
import "./jodit-custom.css"; // Import your custom CSS file
import DOMPurify from "dompurify";
import axios from "axios";
import useAuthorization from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AddPost = () => {
    const { isAuthenticated, isLoading } = useAuthorization();
    const router = useRouter();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const [inputData, setInputData] = useState({
        title: "",
        content: "",
    });

    if (!isAuthenticated && !isLoading) {
        router.push("/login");
        return null;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const cleanContent = DOMPurify.sanitize(inputData.content);

    const editor = useRef(null);
    const config = {
        height: "350px",
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData();
        formData.append("title", inputData.title);
        formData.append("content", cleanContent);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post("/api/posts", formData, {
                headers: {
                    Authorization: token,
                },
            });

            if (response.status === 201) {
                setSuccess(true);
                setInputData({
                    title: "",
                    content: "",
                });
                setTimeout(() => setSuccess(false), 10000);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data.message ||
                        "Error creating post, try again"
                );
                setTimeout(() => setError(""), 10000);
            } else {
                setError("An unknown error occurred");
            }
            setTimeout(() => setError(""), 10000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#182237] rounded-lg py-7 min-h-[520px] mt-20">
            <Container maxWidth="md" className="">
                <Box>
                    <h2 className="text-center font-bold text-3xl">
                        Create a blog post
                    </h2>
                    <div className="text-center w-max mx-auto mt-8">
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && (
                            <Alert severity="success">
                                Post created successfully!
                            </Alert>
                        )}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center md:w-[95%] my-6 mx-auto">
                        <InputField
                            type="text"
                            label="Post title *"
                            placeholder="Enter post title"
                            name="title"
                            value={inputData.title}
                            required
                            onChange={handleChange}
                        />
                        <div className="w-full space-y-3 my-4">
                            <label htmlFor="content" className="text-left p-2">
                                Post content *
                            </label>
                            <JoditEditor
                                ref={editor}
                                config={config}
                                value={inputData.content}
                                onBlur={(newContent) =>
                                    setInputData({
                                        ...inputData,
                                        content: newContent,
                                    })
                                }
                                className="w-full bg-[#2e374a] rounded-lg text-black outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isloading}
                            className={`py-2 px-5  text-white font-medium rounded-md ${
                                isloading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#5d57c9] hover:bg-[#39357e]"
                            }`}>
                            {isloading ? "Creating" : "Add post"}
                        </button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default AddPost;
