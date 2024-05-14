import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    exp: number;
}

const useAuthorization = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // If no token is present, redirect to the login page
            router.push("/login");
            return;
        }

        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                // If token is expired, redirect to login page
                router.push("/login");
                return;
            }

            // Set authentication state to true
            setIsAuthenticated(true);
        } catch (error) {
            // Handle any decoding errors
            console.error("Error decoding token:", error);
            router.push("/login");
        }
    }, []);

    return isAuthenticated;
};

export default useAuthorization;
