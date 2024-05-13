import { ChangeEvent, useState } from "react";
import InputField from "./InputField";
import { Alert, Box, Container } from "@mui/material";
import axios from "axios";

const PasswordForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [inputData, setInputData] = useState({
        currentPassword: "",
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

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("currentPassword", inputData.currentPassword);
        formData.append("newPassword", inputData.newPassword);
        formData.append("confirmPassword", inputData.confirmPassword);

        try {
            const response = await axios.patch("/api/admin", formData, {
                headers: {
                    Authorization: token,
                },
            });

            if (response.status === 200) {
                setSuccess(true);
                setInputData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                setError(response.data.message);
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
        <Container maxWidth="sm" className="">
            <Box>
                <h2 className="text-center font-bold text-3xl">
                    Change your password
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
                    className="flex flex-col items-center md:w-[95%] mt-10 mx-auto space-y-3">
                    <InputField
                        type="password"
                        label="Current Password *"
                        placeholder="Enter current password"
                        name="currentPassword"
                        value={inputData.currentPassword}
                        required
                        onChange={handleChange}
                    />
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
                        type="text"
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
                        {isloading ? "Loading" : "Update"}
                    </button>
                </form>
            </Box>
        </Container>
    );
};

export default PasswordForm;
