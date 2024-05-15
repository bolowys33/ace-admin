"use client";

import InputField from "@/components/InputField";
import { Alert, Box, Container } from "@mui/material";
import JoditEditor from "jodit-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import "@/app/posts/add-post/jodit-custom.css"; // Import your custom CSS file
import DOMPurify from "dompurify";
import axios from "axios";
import useSinglePost from "@/hooks/useSinglePost";
import useAuthorization from "@/hooks/useAuth";
import { useRouter } from "next/router";

const UpdatePost = ({ params }: { params: { url: string } }) => {
    const isAuthenticated = useAuthorization();
    const router = useRouter();

    if (!isAuthenticated) {
        // Redirect to the login page
        router.push("/login");
        return null; // Optionally, render a loading indicator while redirecting
    }

    const { url } = params;
    const { post, error, isFetching } = useSinglePost(url);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    const cleanContent = DOMPurify.sanitize(content);

    const editor = useRef(null);
    const config = {
        height: "350px",
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccess(false);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", cleanContent);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(`/api/posts/${url}`, formData, {
                headers: {
                    Authorization: token,
                },
            });

            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                setSuccess(true);
                setTitle("");
                setContent("");
                setTimeout(() => setSuccess(false), 10000);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data.message ||
                        "Error updating post, try again"
                );
                setTimeout(() => setErrorMessage(""), 10000);
            } else {
                setErrorMessage("An unknown error occurred");
            }
            setTimeout(() => setErrorMessage(""), 10000);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[500px] w-full">
                <h3 className="place-self-center text-xl">Loading...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[500px] w-full">
                <h3 className="place-self-center text-xl">
                    Error fetching post, check your network and try again
                </h3>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[500px] w-full">
                <h3 className="place-self-center text-xl">Post not found</h3>
            </div>
        );
    }

    return (
        <div className="bg-[#182237] rounded-lg py-7 min-h-[520px] mt-20">
            <Container maxWidth="md" className="">
                <Box>
                    <h2 className="text-center font-bold text-3xl">
                        Update Blog Post
                    </h2>
                    <div className="text-center w-max mx-auto mt-8">
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                        )}
                        {success && (
                            <Alert severity="success">
                                Post updated successfully!
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
                            value={title}
                            required
                            onChange={handleTitleChange}
                        />
                        <div className="w-full space-y-3 my-4">
                            <label htmlFor="content" className="text-left p-2">
                                Post content *
                            </label>
                            <JoditEditor
                                ref={editor}
                                config={config}
                                value={content}
                                onBlur={handleContentChange}
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
                            {isloading ? "Updating..." : "Update post"}
                        </button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default UpdatePost;
