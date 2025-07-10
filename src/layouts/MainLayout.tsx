import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {Header} from "../components/MainLayout.tsx";
import Sidebar from "../components/Sidebar.tsx";

interface MainLayoutProps {
    children?: React.ReactNode;
    isDark?: boolean;
    toggleTheme?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ isDark = false, toggleTheme }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen flex-col">
            <Header isDark={isDark} toggleTheme={toggleTheme} />

            <div className="flex flex-1 overflow-hidden">
                <aside className={`${isSidebarOpen ? "w-64" : "w-0"} transition-all duration-300`}>
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        isDark={isDark}
                    />
                </aside>

                <main className="flex-1 overflow-y-auto bg-while p-4 mt-16">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default MainLayout;