"use client";

import useAdmin from "@/hooks/useAdmin";
import useAuthorization from "@/hooks/useAuth";
import { Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const { isAuthenticated, isLoading } = useAuthorization();
    const router = useRouter();

    const { admin, error, isFetching } = useAdmin();

    if (!isAuthenticated && !isLoading) {
        router.push("/login");
        return null;
    }

    if (isFetching) {
        return (
            <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[535px] w-full">
                <h3 className="place-self-center text-xl">Loading...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#182237] my-3 p-5 rounded-lg text-sm h-[535px]">
                <div className="grid place-items-center h-full">
                    <h3 className="text-xl">
                        Error getting profile, check your network and try again.
                    </h3>
                </div>
            </div>
        );
    }

    if (!admin) {
        return (
            <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[535px] w-full">
                <h3 className="place-self-center text-xl">Admin not found</h3>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm min-h-[535px]">
            <Link
                href="profile/edit-profile"
                className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md self-end">
                Edit profile
            </Link>
            <h2 className="text-center font-bold text-3xl mt-5">My Profile</h2>
            <Container maxWidth="sm" className="bg-[#2e374a] rounded-md mt-8">
                <div className="flex flex-col items-center space-y-4 mt-7 font-bold">
                    {admin && (
                        <>
                            <div className="p-5 space-x-14">
                                <span>Username: </span>
                                <span className="border rounded-md py-2 px-5">
                                    {admin.username}
                                </span>
                            </div>
                            <div className="py-5 pl-16 space-x-6">
                                <span>Email Address: </span>
                                <span className="border rounded-md py-2 px-5">
                                    {admin.email}
                                </span>
                            </div>
                            <div className="p-5 space-x-14">
                                <span>First Name: </span>
                                <span className="border rounded-md py-2 px-5">
                                    {admin.firstname}
                                </span>
                            </div>
                            <div className="p-5 space-x-14">
                                <span>Last Name: </span>
                                <span className="border rounded-md py-2 px-5">
                                    {admin.lastname}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default ProfilePage;
