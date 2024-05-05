import Search from "@/components/Search";
import Link from "next/link";

const Attorneys = () => {
    return (
        <div className="bg-[#182237] my-3 p-5 rounded-lg">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for an attorney" />
                <Link
                    href="/add-attorney"
                    className="p-2 bg-[#5d57c9] text-white font-medium rounded-md">
                    Add new
                </Link>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2">Name</td>
                        <td className="p-2">Role</td>
                        <td className="p-2">Date added</td>
                        <td className="p-2">Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2">
                            <div className="flex items-center gap-2">
                                <div className="flex justify-center items-center rounded-full h-10 w-10 bg-white text-[#151c2c] font-bold text-4xl">
                                    J
                                </div>
                                Jide Bolodeoku
                            </div>
                        </td>
                        <td className="p-2">Founding Partner</td>
                        <td className="p-2">20-12-2024</td>
                        <td className="p-2 space-x-2">
                            <button type="button" className="py-1 px-2 rounded-md bg-[teal]">View</button>
                            <button type="button" className="py-1 px-2 rounded-md bg-[crimson]">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Attorneys;
