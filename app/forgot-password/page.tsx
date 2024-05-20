"use client"

import InputField from "@/components/InputField";
import { Alert, Box, Container } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const ForgotPassword = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData();
        formData.append("email", email);

        try {
            const response = await axios.post("/api/forgot-password", formData);

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                setSuccess(true);
                setEmail("")
                setTimeout(() => setSuccess(false), 10000);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data.message ||
                        "Error sending recovery mail, try again"
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
                        Forgot Password
                    </h2>
                    <div className="text-center w-max mx-auto mt-8">
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && (
                            <Alert severity="success">
                                Recovery mail sent, check your inbox or spam!
                            </Alert>
                        )}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center md:w-[95%] mt-16 mx-auto">
                        <InputField
                            type="email"
                            label="Email*"
                            placeholder="Enter email address"
                            name="email"
                            value={email}
                            required
                            onChange={handleChange}
                        />
                        <Link href={"/login"} className="text-[red] mt-5">Know your password? Sign-in instead</Link>
                        <button
                            type="submit"
                            disabled={isloading}
                            className={`py-2 px-5  text-white font-medium rounded-md mt-8 ${
                                isloading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#5d57c9] hover:bg-[#39357e]"
                            }`}>
                            {isloading ? "Loading" : "Submit"}
                        </button>
                    </form>
                </Box>
            </Container>
        </div>
    );
}
 
export default ForgotPassword;