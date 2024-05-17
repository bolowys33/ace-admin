"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const excludedPaths = ["/login", "/forgot-password", "/reset-password"];

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex">
                    {!excludedPaths.some((path) =>
                        pathname.startsWith(path)
                    ) && (
                        <div className="hidden md:block w-1/5 h-screen bg-[#182237] pl-5 py-3 sticky top-0">
                            <Sidebar />
                        </div>
                    )}
                    <div
                        className={`w-full ${
                            !excludedPaths.some((path) =>
                                pathname.startsWith(path)
                            )
                                ? "md:w-4/5"
                                : "md:w-full"
                        } `}>
                        <Navbar />
                        <div className="mt-[98px] px-3">{children}</div>
                    </div>
                </div>
            </body>
        </html>
    );
}
