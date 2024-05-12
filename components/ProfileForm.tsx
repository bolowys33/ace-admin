import { ChangeEvent, useState } from "react";
import InputField from "./InputField";
import { Alert, Box, Container } from "@mui/material";
import { Admin } from "@/hooks/useAdmin";
import axios from "axios";

const ProfileForm = ({ admin }: { admin: Admin }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [inputData, setInputData] = useState({
        username: admin.username,
        email: admin.email,
        firstname: admin.firstname,
        lastname: admin.lastname,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        const token = localStorage.getItem("token")

        const formData = new FormData();
        formData.append("username", inputData.username);
        formData.append("email", inputData.email);
        formData.append("firstname", inputData.firstname);
        formData.append("lastname", inputData.lastname);

        try {
            const response = await axios.put("/api/admin", formData, {
                headers: {
                    Authorization: token
                }
            });

            if (response.status === 200) {
                setSuccess(true);
                setInputData({
                    username: "",
                    email: "",
                    firstname: "",
                    lastname: "",
                });
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data.message ||
                        "Error updating profile, try again"
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
                    Edit your Account
                </h2>
                <div className="text-center w-max mx-auto mt-8">
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && (
                        <Alert severity="success">
                            Profile updated successfully!
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
                        type="email"
                        label="Email *"
                        placeholder="Enter email address"
                        name="email"
                        value={inputData.email}
                        required
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        label="First Name *"
                        placeholder="Enter username"
                        name="firstname"
                        value={inputData.firstname}
                        required
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        label="Last Name *"
                        placeholder="Enter lastname"
                        name="lastname"
                        value={inputData.lastname}
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

export default ProfileForm;
