import { Container } from "@mui/material";

const ProfilePage = () => {
    return (
        <div className="flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm min-h-[535px]">
            <Container maxWidth="sm" className="">
                <h2 className="text-center font-bold text-3xl mt-5">
                    My Profile
                </h2>
                <div className="">
                    <div>
                        <span>Username: </span>
                        <span>Bolowys30</span>
                    </div>
                    <div>
                        <span>Username: </span>
                        <span>Bolowys30</span>
                    </div>
                    <div>
                        <span>Email Address: </span>
                        <span>Bolowys30@gfgdu.com</span>
                    </div>
                    <div>
                        <span>First Name: </span>
                        <span>Bolowys30</span>
                    </div>
                    <div>
                        <span>Last Name: </span>
                        <span>Bolowys30</span>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProfilePage;
