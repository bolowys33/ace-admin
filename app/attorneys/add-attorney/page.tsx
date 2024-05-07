import InputField from "@/components/InputField";
import { Box, Container } from "@mui/material";
import { useState } from "react";

const AddAtorney = () => {
    const [inputData, setInputData] = useState({
        firstname: "",
        lastname: "",
        position: "",
    });
    const [file, setFile] = useState(null);

    return (
        <div className="bg-[#182237] rounded-lg py-7 min-h-[520px] mt-20">
            <Container maxWidth="sm" className="">
                <Box>
                    <h2 className="text-center font-bold text-3xl">
                        Create Attorney details
                    </h2>
                    <form className="flex flex-col items-center md:w-[95%] mt-10 mx-auto space-y-3">
                        <InputField
                            type="text"
                            label="First Name *"
                            placeholder="Enter Firstname"
                            name="firstname"
                            required
                        />
                        <InputField
                            type="text"
                            label="Last Name *"
                            placeholder="Enter Lastname"
                            name="lastname"
                            required
                        />
                        <InputField
                            type="text"
                            label="Position held *"
                            placeholder="Enter position"
                            name="positiom"
                            required
                        />
                        <InputField
                            type="file"
                            label="Attorney Image *"
                            name="image"
                            required
                        />
                        <button
                            type="submit"
                            className="py-2 px-5 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md">
                            Add attorney
                        </button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default AddAtorney;
