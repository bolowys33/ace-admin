import { Container } from "@mui/material";
import Link from "next/link";

const ProfilePage = () => {
    return (
        <div className="flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm min-h-[535px]">
            <Link
                    href="/edit-profile"
                    className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md self-end">
                    Edit profile
                </Link>
                <h2 className="text-center font-bold text-3xl mt-5">
                    My Profile
                </h2>
            <Container maxWidth="sm" className="bg-[#2e374a] rounded-md mt-8">
                <div className="space-y-4 mt-7 font-bold">
                    <div className="p-5 space-x-14">
                        <span>Username: </span>
                        <span className="border rounded-md py-2 px-5">Bolowys30</span>
                    </div>
                    <div className="p-5 space-x-8">
                        <span>Email Address: </span>
                        <span className="border rounded-md py-2 px-5">Bolowys30@gfgdu.com</span>
                    </div>
                    <div className="p-5 space-x-14">
                        <span>First Name: </span>
                        <span className="border rounded-md py-2 px-5">Bolowys30</span>
                    </div>
                    <div className="p-5 space-x-14">
                        <span>Last Name: </span>
                        <span className="border rounded-md py-2 px-5">Bolowys30</span>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProfilePage;
