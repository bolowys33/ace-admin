import { Container } from "@mui/material";

const ProfilePage = () => {
    return (
        <div className="flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm min-h-[535px]">
            <Container>
                <h2 className="text-center font-bold text-3xl mt-5">
                    My Profile
                </h2>
            </Container>
        </div>
    );
};

export default ProfilePage;
