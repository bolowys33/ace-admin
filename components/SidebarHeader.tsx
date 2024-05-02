import React from "react";

interface SidebarHeaderProps {
    username: string;
    role: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ username, role }) => {
    return (
        <div className="flex items-center space-x-5">
            <div className="flex justify-center items-center rounded-full h-12 w-12 bg-white text-[#151c2c] font-bold text-4xl">
                J
            </div>
            <div className="flex flex-col">
                <span className="font-bold">{username}</span>
                <span className="text-xs text-[#b7bac1]">{role}</span>
            </div>
        </div>
    );
};

export default SidebarHeader;
