"use client";

import { SearchRounded } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import SidebarHeader from "./SidebarHeader";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-between rounded-md p-5 bg-[#182237]">
            <div className="uppercase">{pathname === "/" ? "Dashboard" : pathname}</div>
            <div className="flex items-center bg-[#2e374a] gap-2 rounded-lg p-2 ">
                <SearchRounded />
                <input type="text" title="search" placeholder="Search" className="bg-transparent border-none outline-none pl-2" />
            </div>
            <div>
                <SidebarHeader username="John Doe" role="administrator" />
            </div>
        </div>
    );
};

export default Navbar;
