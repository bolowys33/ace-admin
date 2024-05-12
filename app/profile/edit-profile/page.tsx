import useAdmin from "@/hooks/useAdmin";
import { useState } from "react";

const EditProfile = () => {
    const { admin, error, isFetching } = useAdmin();

    const [isProfile, setIsProfile] = useState<boolean>(true);

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

    return <div></div>;
};

export default EditProfile;
