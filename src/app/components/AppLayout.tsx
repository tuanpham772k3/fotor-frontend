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

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />
            <div className="app-main-content">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
                {children}
            </div>
        </>
    );
}

