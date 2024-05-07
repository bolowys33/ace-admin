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
    data: Attorney[];
    message: string | null;
}

const useAttorneys = () => {
    const [attorneys, setAttorneys] = useState<Attorney[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAttorneys = async (): Promise<void> => {
        setIsFetching(true);
        setError(null);

        try {
            const response: AxiosResponse<AttorneyResponse> = await axios.get(
                "/api/attorneys"
            );
            if (response.data.success) {
                setAttorneys(response.data.data);
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError("An error occurred while fetching attorneys.");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getAttorneys();
    }, []);

    return { attorneys, isFetching, error, getAttorneys };
};

export default useAttorneys;
