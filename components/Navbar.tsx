

import { SearchRounded } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import SidebarHeader from "./SidebarHeader";

const Navbar = () => {

    return (
        <div className="flex items-center justify-end w-full md:w-4/5 fixed p-5 bg-[#182237] z-50">
            {/* <div className="uppercase text-[#b7bac1]">{pathname === "/" ? "Dashboard" : pathname}</div> */}
            {/* <div className="flex items-center bg-[#2e374a] gap-2 rounded-lg p-2 ">
                <SearchRounded />
                <input type="text" title="search" placeholder="Search" className="bg-transparent border-none outline-none pl-2" />
            </div> */}
            <div>
                <SidebarHeader username="John Doe" role="administrator" />
            </div>
        </div>
    );
};

export default Navbar;
