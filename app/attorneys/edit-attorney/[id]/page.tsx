"use client";

import InputField from "@/components/InputField";
import useSingleAttorney from "@/hooks/useSingleAttorney";
import { Alert, Box, Container } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

const EditAttorney = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const { attorney, isFetching, error } = useSingleAttorney(id);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const [inputData, setInputData] = useState({
        firstname: "",
        lastname: "",
        position: "",
    });

    useEffect(() => {
        if (attorney) {
            const name = attorney.name.split(" ");
            setInputData({
                firstname: name[0],
                lastname: name[1],
                position: attorney.position,
            });
        }
    }, [attorney]);

    const [image, setImage] = useState<File | null>(null);

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
        setErrorMessage("");
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
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data.message ||
                        "Error adding attorney, try again"
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
                    Error fetching attorney profile, check your network and try
                    again
                </h3>
            </div>
        );
    }

    if (!attorney) {
        return (
            <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[500px] w-full">
                <h3 className="place-self-center text-xl">
                    Attorney profile not found
                </h3>
            </div>
        );
    }

    return (
        <div className="bg-[#182237] rounded-lg py-7 min-h-[520px] mt-20">
            <Container maxWidth="sm" className="">
                <Box>
                    <h2 className="text-center font-bold text-3xl">
                        Update Attorney details
                    </h2>
                    <div className="text-center w-max mx-auto mt-8">
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                        )}
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
                            label="Attorney Image "
                            name="image"
                            required={false}
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
                            {isloading ? "Updating..." : "Update attorney"}
                        </button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default EditAttorney;
