import InputField from "@/components/InputField";
import { Box, Container } from "@mui/material";

const AddAtorney = () => {
    return (
        <div className="bg-[#182237] rounded-lg py-7 min-h-[520px] mt-20">
            <Container maxWidth="md" className="">
                <Box>
                    <h2 className="text-center font-bold text-3xl">
                        Create Attorney details
                    </h2>
                    <form className="flex flex-col items-center md:w-[95%] my-6 mx-auto">
                        <InputField
                            label="First Name *"
                            placeholder="Enter Firstname"
                            name="firstname"
                            required
                        />
                        <InputField
                            label="Last Name *"
                            placeholder="Enter Lastname"
                            name="lastname"
                            required
                        />
                        <InputField
                            label="Position held *"
                            placeholder="Enter position"
                            name="positiom"
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
