"use client";

import InputField from "@/components/InputField";
import { Alert, Box, Container } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const RecoverPassword = ({ params }: { params: { token: string } }) => {
    const { token } = params;

    const router = useRouter();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [inputData, setInputData] = useState({
        newPassword: "",
        confirmPassword: "",
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
        formData.append("newPassword", inputData.newPassword);
        formData.append("token", token);

        try {
            if (inputData.newPassword.length < 8) {
                setError("Password should be at least 8 characters");
                return setTimeout(() => setError(""), 10000);
            }

            if (inputData.newPassword !== inputData.confirmPassword) {
                setError("Password confirmation is incorrect");
                return setTimeout(() => setError(""), 10000);
            }

            const response = await axios.post(
                "/api/recover-password",
                formData,
                {}
            );

            if (response.status === 200) {
                setSuccess(true);
                setInputData({
                    newPassword: "",
                    confirmPassword: "",
                });
                setTimeout(() => router.push("/login"), 5000);
            } else {
                setError(response.data.message);
                setTimeout(() => setError(""), 10000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data.message ||
                        "Error changing password, try again"
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
                        Reset your password
                    </h2>
                    <div className="text-center w-max mx-auto mt-8">
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && (
                            <Alert severity="success">
                                Password updated successfully!
                            </Alert>
                        )}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center md:w-[95%] mt-10 mx-auto space-y-5">
                        <InputField
                            type="password"
                            label="New Password *"
                            placeholder="Enter new password"
                            name="newPassword"
                            value={inputData.newPassword}
                            required
                            onChange={handleChange}
                        />
                        <InputField
                            type="password"
                            label="Confirm Password*"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={inputData.confirmPassword}
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
                            {isloading ? "Loading" : "Reset"}
                        </button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default RecoverPassword;
