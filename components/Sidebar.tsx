"use client";
import React from "react";
import MENU_LINKS from "@/constants/menuLinks";
import {
    SpaceDashboardRounded,
    LogoutRounded,
    LoginRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === "/login") {
        return null; // Don't render the sidebar on the login page
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div>
            <div className="mt-3 space-y-4 pr-8">
                <div>
                    <div
                        className={`hover:bg-[#2e374a] p-3 rounded-md ${
                            pathname === "/" ? "bg-[#2e374a]" : ""
                        }`}>
                        <Link href={"/"}>
                            <SpaceDashboardRounded /> Dashboard
                        </Link>
                    </div>
                    <ul className="">
                        {MENU_LINKS.map((category, index) => (
                            <li
                                key={index}
                                className="pl-4 mt-3 text-[#b7bac1]">
                                <div>
                                    {category.icon} {category.title}
                                </div>
                                <ul className="text-white">
                                    {category.links.map((link, linkIndex) => (
                                        <li
                                            key={`${index}-${linkIndex}`}
                                            className={`hover:bg-[#2e374a] ml-5 my-1 p-[10px] rounded-md ${
                                                pathname === link.path
                                                    ? "bg-[#2e374a]"
                                                    : ""
                                            }`}>
                                            <Link href={link.path}>
                                                {link.icon} {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className={`bg-[#cc3636] hover:bg-[#582121] p-3 rounded-md cursor-pointer`}>
                    <button type="button" onClick={handleLogout}>
                        <LogoutRounded /> Sign-out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
