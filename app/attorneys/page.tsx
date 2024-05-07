"use client"

import Search from "@/components/Search";
import useAttorneys from "@/hooks/useAttorneys";
import Link from "next/link";

const Attorneys = () => {

    const { attorneys, isFetching, error, getAttorneys } = useAttorneys()

    return (
        <div className="bg-[#182237] my-3 p-5 rounded-lg text-sm h-[500px]">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for an attorney" />
                <Link
                    href="/attorneys/add-attorney"
                    className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md">
                    Add new
                </Link>
            </div>
            <table className="w-full my-5">
                <thead>
                    <tr>
                        <td className="px-2 pb-3">Name</td>
                        <td className="px-2 pb-3">Role</td>
                        <td className="px-2 pb-3">Date added</td>
                        <td className="px-2 pb-3">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {attorneys.map(attorney => (
                        <tr key={attorney._id}>
                        <td className="p-2">
                            <div className="flex items-center gap-2">
                                <div className="flex justify-center items-center rounded-full h-10 w-10 bg-white text-[#151c2c] font-bold text-4xl">
                                    J
                                </div>
                                {attorney.name}
                            </div>
                        </td>
                        <td className="p-2">{attorney.position}</td>
                        <td className="p-2">20-12-2024</td>
                        <td className="p-2 space-x-2">
                            <button
                                type="button"
                                className="py-1 px-2 rounded-md bg-[teal]">
                                Edit
                            </button>
                            <button
                                type="button"
                                className="py-1 px-2 rounded-md bg-[crimson]">
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Attorneys;
