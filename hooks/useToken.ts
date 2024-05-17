import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface TokenResponse {
    success: boolean;
    message: string | null;
}

const useToken = (token: string) => {
    const [active, setActive] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getToken = async () => {
        setIsFetching(true);
        setError(null);

        try {
            const { data }: AxiosResponse<TokenResponse> = await axios.get(
                "/api/recover-password",
                {
                    headers: {
                        "X-Recovery-Token": token,
                    },
                }
            );

            if (data.success) {
                setActive(true);
            } else {
                setActive(false);
                setError(data.message);
            }
        } catch (error) {
            setError("An error occurred while fetching token.");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (token) {
            getToken();
        }
    }, [token]);

    return { active, isFetching, error, getToken };
};

export default useToken;
