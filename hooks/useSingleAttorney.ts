import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

interface Attorney {
    _id: string;
    name: string;
    position: string;
    image_url: string;
    image_id: string;
}

interface AttorneyResponse {
    success: boolean;
    data: Attorney;
    message: string | null;
}

const useSingleAttorney = (id: string) => {
    const [attorney, setAttorney] = useState<Attorney | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getPost = async (): Promise<void> => {
        setIsFetching(true);
        setError(null);

        try {
            const response: AxiosResponse<AttorneyResponse> = await axios.get(
                `/api/attorneys/${id}`
            );
            if (response.data.success) {
                setAttorney(response.data.data);
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError("An error occurred while fetching post.");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (id) {
            getPost();
        } else {
            setIsFetching(false);
        }
    }, [id]);

    return { attorney, isFetching, error };
};

export default useSingleAttorney;
