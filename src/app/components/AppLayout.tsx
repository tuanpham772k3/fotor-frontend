"use client";

import { useState } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <div className="app-main-content">
                <Header />
                {children}
            </div>
        </>
    );
}

