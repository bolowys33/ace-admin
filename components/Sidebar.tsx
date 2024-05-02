"use client";

import React, { useState } from "react";
import MENU_LINKS from "@/constants/menuLinks";
import {
    SpaceDashboardRounded,
    ExpandMore,
    ExpandLess,
} from "@mui/icons-material";
import Link from "next/link";

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
