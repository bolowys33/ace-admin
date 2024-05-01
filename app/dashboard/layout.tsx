import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div>
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default Layout;
