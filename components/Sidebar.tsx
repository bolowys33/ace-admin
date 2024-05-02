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
                <div className="flex justify-center items-center rounded-full h-12 w-12 bg-white text-[#151c2c] font-bold text-4xl">B</div>
                <div className="flex flex-col">
                    <span className="font-bold">John Doe</span>
                    <span className="text-xs text-[#b7bac1]">administartor</span>
                </div>
            </div>
            <Link href={"/"}>
                <SpaceDashboardRounded /> Dashboard
            </Link>
            <ul>
                {MENU_LINKS.map((category, index) => (
                    <li key={index}>
                        <div onClick={() => toggleCategory(index)}>
                            {category.icon} {category.title}{" "}
                            {openCategories.includes(index) ? (
                                <ExpandLess fontSize="small" />
                            ) : (
                                <ExpandMore fontSize="small" />
                            )}
                        </div>
                        {openCategories.includes(index) && (
                            <ul>
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
    );
};

export default Sidebar;
