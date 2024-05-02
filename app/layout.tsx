import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex">
                    <div className="w-1/5 h-screen bg-[#182237] pl-5 py-3">
                        <Sidebar />
                    </div>
                    <div className="w-4/5 p-5">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
