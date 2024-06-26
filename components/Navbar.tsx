"use client";

import { usePathname } from "next/navigation";
import SidebarHeader from "./SidebarHeader";

const Navbar = () => {
    const pathname = usePathname();
    const excludedPaths = ["/login", "/forgot-password", "/reset-password"];

    return (
        <div
            className={`flex items-center justify-end w-full ${
                !excludedPaths.some((path) => pathname.startsWith(path))
                    ? "md:w-4/5"
                    : "md:w-full"
            } fixed p-5 bg-[#182237] z-50`}>
            <div>
                <SidebarHeader username="John Doe" role="administrator" />
            </div>
        </div>
    );
};

export default Navbar;
