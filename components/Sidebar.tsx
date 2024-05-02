"use client";

import React, { useState } from "react";
import MENU_LINKS from "@/constants/menuLinks";
import {
    SpaceDashboardRounded,
    ExpandMore,
    ExpandLess,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Sidebar = () => {
    const pathname = usePathname()


    const [openCategories, setOpenCategories] = useState<number[]>([]);

    const toggleCategory = (index: number) => {
        setOpenCategories((prevState) =>
            prevState.includes(index)
                ? prevState.filter((i) => i !== index)
                : [...prevState, index]
        );
    };

    return (
        <div>
            <div className="flex items-center space-x-5">
                <div className="flex justify-center items-center rounded-full h-12 w-12 bg-white text-[#151c2c] font-bold text-4xl">
                    J
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">John Doe</span>
                    <span className="text-xs text-[#b7bac1]">
                        administartor
                    </span>
                </div>
            </div>
            <div className="mt-5">
                <div className={`hover:bg-[#2e374a] p-3 rounded-md ${pathname === '/' ? "bg-[#2e374a]" : ""}`}>
                    <Link href={"/"}>
                        <SpaceDashboardRounded /> Dashboard
                    </Link>
                </div>
                <ul className="">
                    {MENU_LINKS.map((category, index) => (
                        <li key={index} className="cursor-pointer pl-4 mt-[6px]">
                            <div onClick={() => toggleCategory(index)}>
                                {category.icon} {category.title}
                                {openCategories.includes(index) ? (
                                    <ExpandLess fontSize="small" />
                                ) : (
                                    <ExpandMore fontSize="small" />
                                )}
                            </div>
                            {openCategories.includes(index) && (
                                <ul className="">
                                    {category.links.map((link, linkIndex) => (
                                        <li key={`${index}-${linkIndex}`} className={`ml-5 my-2 p-[10px] rounded-md ${pathname === link.path ? "bg-[#2e374a]" : ""}`}>
                                            <Link href={link.path}>
                                                {link.icon} {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
