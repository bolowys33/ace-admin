import Link from "next/link";
import Search from "./Search";
import useAttorneys from "@/hooks/useAttorneys";

const Attorneys = () => {
    const { attorneys, isFetching, error } = useAttorneys();

    if (error) {
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
                            <td className="px-2 pb-3 w-2/5">Name</td>
                            <td className="px-2 pb-3 w-[30%]">Role</td>
                            <td className="px-2 pb-3 w-[10%]">Date added</td>
                            <td className="px-2 pb-3 w-[20%]">Action</td>
                        </tr>
                    </thead>
                </table>
                <h3 className="place-self-center mt-[150px] text-xl">
                    Error fetching attorneys, check your network and try again
                </h3>
            </div>
        );
    }

    if (isFetching) {
        return (
            <div className=" flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm h-[500px]">
                <div className="flex items-center justify-between">
                    <Search placeholder="Search for an attorney" />
                    <Link
                        href="/attorneys/add-attorney"
                        className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md">
                        Add new
                    </Link>
                </div>
                <div>
                    <table className="w-full my-5">
                        <thead>
                            <tr>
                                <td className="px-2 pb-3 w-[40%]">Name</td>
                                <td className="px-2 pb-3 w-[30%]">Role</td>
                                <td className="px-2 pb-3 w-[10%]">
                                    Date added
                                </td>
                                <td className="px-2 pb-3 w-[20%]">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 5 }, (_, index) => (
                                <tr key={index}>
                                    <td className="p-2">
                                        <div className="h-6 bg-gray-500 animate-pulse"></div>
                                    </td>
                                    <td className="p-2">
                                        <div className="h-6 bg-gray-500 animate-pulse"></div>
                                    </td>
                                    <td className="p-2">
                                        <div className="h-6 bg-gray-500 animate-pulse"></div>
                                    </td>
                                    <td className="flex p-2 space-x-2">
                                        <div className="h-6 w-16 bg-gray-500 animate-pulse"></div>
                                        <div className="h-6 w-16 bg-gray-500 animate-pulse"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm h-[500px]">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for an attorney" />
                <Link
                    href="/attorneys/add-attorney"
                    className="p-2 bg-[#5d57c9] hover:bg-[#39357e] text-white font-medium rounded-md">
                    Add new
                </Link>
            </div>
            {!isFetching && attorneys?.length == 0 ? (
                <h3 className="place-self-center mt-[150px] text-xl">
                    No attorney profile found, click{" "}
                    <Link
                        href="/attorneys/add-attorney"
                        className="underline text-blue-500">
                        here
                    </Link>{" "}
                    to add new attorney
                </h3>
            ) : (
                <div>
                    <table className="w-full my-5">
                        <thead>
                            <tr>
                                <td className="px-2 pb-3 w-2/5">Name</td>
                                <td className="px-2 pb-3 w-[30%]">Role</td>
                                <td className="px-2 pb-3 w-[10%]">
                                    Date added
                                </td>
                                <td className="px-2 pb-3 w-[20%]">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {attorneys?.map((attorney) => (
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
                                    <Link
                                            href={`/attorneys/attorney/${attorney._id}`}>
                                            <button
                                                type="button"
                                                className="py-1 px-2 rounded-md bg-[teal] hover:bg-[#103131]">
                                                Edit
                                            </button>
                                        </Link>
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
            )}
        </div>
    );
};

export default Attorneys;
