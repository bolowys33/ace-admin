"use client";

import InputField from "@/components/InputField";
import { Alert, Box, Container } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const Login = () => {
    const router = useRouter()

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const [inputData, setInputData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData();
        formData.append("username", inputData.username);
        formData.append("password", inputData.password);

        try {
            const response = await axios.post("/api/login", formData);

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                setSuccess(true);
                setInputData({
                    username: "",
                    password: "",
                });
                setTimeout(() => router.back(), 4000)
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data.message ||
                        "Error logging in, try again"
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
            <Container maxWidth="xs" className="">
                <Box>
                    <h2 className="text-center font-bold text-3xl">
                        Sign-in your account
                    </h2>
                    <div className="text-center w-max mx-auto mt-8">
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && (
                            <Alert severity="success">
                                Logged in successfully!
                            </Alert>
                        )}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center md:w-[95%] mt-10 mx-auto space-y-3">
                        <InputField
                            type="text"
                            label="Username *"
                            placeholder="Enter username"
                            name="username"
                            value={inputData.username}
                            required
                            onChange={handleChange}
                        />
                        <InputField
                            type="password"
                            label="Password *"
                            placeholder="Enter password"
                            name="password"
                            value={inputData.password}
                            required
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            disabled={isloading}
                            className={`py-2 px-5  text-white font-medium rounded-md ${
                                isloading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#5d57c9] hover:bg-[#39357e]"
                            }`}>
                            {isloading ? "Loading" : "Sign-in"}
                        </button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
