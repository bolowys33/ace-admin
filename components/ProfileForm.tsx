import { ChangeEvent, useState } from "react";
import InputField from "./InputField";
import { Alert, Box, Container } from "@mui/material";
import { Admin } from "@/hooks/useAdmin";

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
                        {isloading ? "Loading" : "Sign-in"}
                    </button>
                </form>
            </Box>
        </Container>
    );
};

export default ProfileForm;
