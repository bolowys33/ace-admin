import { Container } from "@mui/material";
import { jwtVerify } from "jose";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            jwtVerify(token, "your_secret_key").then((decodedToken) => {
                setUser(decodedToken);
            }).catch((error) => {
                console.error("Token verification failed:", error);
            });
        }
    }, []);

    return (
        <div className="flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm min-h-[535px]">
            <Link
                href="profile/edit-profile"
                className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md self-end">
                Edit profile
            </Link>
            <h2 className="text-center font-bold text-3xl mt-5">
                My Profile
            </h2>
            <Container maxWidth="sm" className="bg-[#2e374a] rounded-md mt-8">
                <div className="flex flex-col items-center space-y-4 mt-7 font-bold">
                    {user && (
                        <>
                            <div className="p-5 space-x-14">
                                <span>Username: </span>
                                <span className="border rounded-md py-2 px-5">{user.username}</span>
                            </div>
                            <div className="py-5 pl-16 space-x-6">
                                <span>Email Address: </span>
                                <span className="border rounded-md py-2 px-5">{user.email}</span>
                            </div>
                            <div className="p-5 space-x-14">
                                <span>First Name: </span>
                                <span className="border rounded-md py-2 px-5">{user.firstName}</span>
                            </div>
                            <div className="p-5 space-x-14">
                                <span>Last Name: </span>
                                <span className="border rounded-md py-2 px-5">{user.lastName}</span>
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default ProfilePage;
