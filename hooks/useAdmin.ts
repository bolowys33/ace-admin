import axios from "axios";
import { useEffect, useState } from "react";

interface Admin {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
}

interface AdminResponse {
    success: boolean;
    data: Admin;
    message: string | null;
}

const useAdmin = () => {
    const token = localStorage.getItem("token");

    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAdmin = async () => {
        setIsFetching(true);
        setError(null);

        try {
            const { data } = await axios.get("/admin", {
                headers: {
                    Authorization: token,
                },
            });

            if (data.success) {
                setAdmin(data.data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("An error occurred while fetching admin.");
        } finally {
            setIsFetching(false);
        }

        useEffect(() => {
            getAdmin();
        }, []);
    };
};
