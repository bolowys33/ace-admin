import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    exp: number
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const token = localStorage.getItem("token");

    if (!token) {
        // If the user is not authenticated, redirect to the login page
        router.push("/login");
        return null;
    }

    try {
        // Verify and decode the token
        const decodedToken = jwtDecode<DecodedToken>(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            // If the token is expired, redirect to the login page
            router.push("/login");
            return null;
        }

        // If the user is authorized, render the children components
        return children;
    } catch (error) {
        // If there's an error verifying the token, redirect to the login page
        router.push("/login");
        return null;
    }
};

export default ProtectedRoute;
