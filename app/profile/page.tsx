import { Container } from "@mui/material";
import { JWTVerifyResult, jwtVerify } from "jose";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setError(false);
            jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET as string)
            )
                .then((decodedToken: JWTVerifyResult<any>) => {
                    const { username, email, firstName, lastName } =
                        decodedToken.payload;
                    setUser({ username, email, firstName, lastName });
                })
                .catch((error) => {
                    setError(true);
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
            <h2 className="text-center font-bold text-3xl mt-5">My Profile</h2>
            <Container maxWidth="sm" className="bg-[#2e374a] rounded-md mt-8">
                <div className="flex flex-col items-center space-y-4 mt-7 font-bold">
                    {user && (
                        <>
                            <div className="p-5 space-x-14">
                                <span>Username: </span>
                                <span className="border rounded-md py-2 px-5">
                                    {user.username}
                                </span>
                            </div>
                            <div className="py-5 pl-16 space-x-6">
                                <span>Email Address: </span>
                                <span className="border rounded-md py-2 px-5">
                                    {user.email}
                                </span>
                            </div>
                            <div className="p-5 space-x-14">
                                <span>First Name: </span>
                                <span className="border rounded-md py-2 px-5">
                                    {user.firstName}
                                </span>
                            </div>
                            <div className="p-5 space-x-14">
                                <span>Last Name: </span>
                                <span className="border rounded-md py-2 px-5">
                                    {user.lastName}
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
