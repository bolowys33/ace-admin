"use client";

import InputField from "@/components/InputField";
import useAuthorization from "@/hooks/useAuth";
import { Alert, Box, Container } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const AddAtorney = () => {
    const { isAuthenticated, isLoading } = useAuthorization();
    const router = useRouter();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const [inputData, setInputData] = useState({
        firstname: "",
        lastname: "",
        position: "",
    });
    const [image, setImage] = useState<File | null>(null);

    if (!isAuthenticated && !isLoading) {
        router.push("/login");
        return null;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData();
        formData.append("name", `${inputData.firstname} ${inputData.lastname}`);
        formData.append("position", inputData.position);
        if (image) formData.append("image", image);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post("/api/attorneys", formData, {
                headers: {
                    Authorization: token,
                },
            });

            if (response.status === 201) {
                setSuccess(true);
                setInputData({
                    firstname: "",
                    lastname: "",
                    position: "",
                });
                setImage(null);
                setTimeout(() => setSuccess(false), 10000);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data.message ||
                        "Error adding attorney, try again"
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
                        Create Attorney details
                    </h2>
                    <div className="text-center w-max mx-auto mt-8">
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && (
                            <Alert severity="success">
                                Attorney added successfully!
                            </Alert>
                        )}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center md:w-[95%] mt-10 mx-auto space-y-3">
                        <InputField
                            type="text"
                            label="First Name *"
                            placeholder="Enter Firstname"
                            name="firstname"
                            value={inputData.firstname}
                            required
                            onChange={handleChange}
                        />
                        <InputField
                            type="text"
                            label="Last Name *"
                            placeholder="Enter Lastname"
                            name="lastname"
                            value={inputData.lastname}
                            required
                            onChange={handleChange}
                        />
                        <InputField
                            type="text"
                            label="Position held *"
                            placeholder="Enter position"
                            name="position"
                            required
                            value={inputData.position}
                            onChange={handleChange}
                        />
                        <InputField
                            type="file"
                            label="Attorney Image *"
                            name="image"
                            required
                            onChange={handleFileChange}
                        />
                        <button
                            type="submit"
                            disabled={isloading}
                            className={`py-2 px-5  text-white font-medium rounded-md ${
                                isloading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#5d57c9] hover:bg-[#39357e]"
                            }`}>
                            {isloading ? "Loading" : "Add attorney"}
                        </button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default AddAtorney;
