import React from "react";
import {
    SpaceDashboardRounded,
    MenuBookRounded,
    SupervisorAccountRounded,
    PostAddRounded,
    LibraryBooksRounded,
    PersonAddRounded,
    Groups2Rounded,
} from "@mui/icons-material";

interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactElement;
}

interface MenuLinks {
    title: string;
    links: MenuItem[];
    icon: React.ReactElement;
}

const MENU_LINKS: MenuLinks[] = [
    {
        title: "Posts",
        links: [
            {
                title: "Add Post",
                path: "/add-post",
                icon: React.createElement(PostAddRounded),
            },
            {
                title: "All Posts",
                path: "/posts",
                icon: React.createElement(LibraryBooksRounded),
            },
        ],
        icon: React.createElement(MenuBookRounded),
    },
    {
        title: "Attorneys",
        links: [
            {
                title: "Add Attorney",
                path: "/add-atorney",
                icon: React.createElement(PersonAddRounded),
            },
            {
                title: "View Attorneys",
                path: "/attorneys",
                icon: React.createElement(Groups2Rounded),
            },
        ],
        icon: React.createElement(SupervisorAccountRounded),
    },
    {
        title: "Account Settings",
        links: [
            {
                title: "Add Attorney",
                path: "/add-atorney",
                icon: React.createElement(PersonAddRounded),
            },
            {
                title: "View Attorneys",
                path: "/all-attorneys",
                icon: React.createElement(Groups2Rounded),
            },
        ],
        icon: React.createElement(SupervisorAccountRounded),
    },
];

export default MENU_LINKS;
