"use client";

import React, { useState } from "react";
import MENU_LINKS from "@/constants/menuLinks";
import {
    SpaceDashboardRounded,
    ExpandMore,
    ExpandLess,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
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
                    B
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">John Doe</span>
                    <span className="text-xs text-[#b7bac1]">
                        administartor
                    </span>
                </div>
            </div>
            <div className="mt-5">
                <div className="hover:bg-[#2e374a] p-4 rounded-md">
                    <Link href={"/"}>
                        <SpaceDashboardRounded /> Dashboard
                    </Link>
                </div>
                <ul className="">
                    {MENU_LINKS.map((category, index) => (
                        <li key={index} className="cursor-pointer p-4">
                            <div onClick={() => toggleCategory(index)}>
                                {category.icon} {category.title}{" "}
                                {openCategories.includes(index) ? (
                                    <ExpandLess fontSize="small" />
                                ) : (
                                    <ExpandMore fontSize="small" />
                                )}
                            </div>
                            {openCategories.includes(index) && (
                                <ul className="pl-6 pt-4 space-y-3">
                                    {category.links.map((link, linkIndex) => (
                                        <li key={`${index}-${linkIndex}`}>
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
