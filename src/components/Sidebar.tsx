import React from 'react';
import {Link} from "react-router-dom";

// TypeScript interfaces
interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    isDark: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, toggleSidebar, isDark}) => {
    const menuItems = [
        {label: 'Trang tổng quan', icon: '📊', href: 'total'},
        {label: 'Sản phẩm', icon: '🛒', href: 'member-ship-package-mng'},
        {label: 'Người dùng', icon: '👥', href: 'users'},
        {label: 'Kê hoạch', icon: '📈', href: 'quitplan-mng'},
        {label: 'Bài viết', icon: '💬', href: 'blogs-manager'},

    ];

    console.log(isDark);

    return (
        <div
            className={`fixed top-16 h-[calc(100%-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
                isOpen ? 'w-64' : 'w-16'
            }`}
        >
            <button
                onClick={toggleSidebar}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full m-2"
            >
                <svg
                    className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            <div className="overflow-y-auto h-full pt-4">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.href}
                        className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-2 mb-1"
                    >
                        <span className="mr-2">{item.icon}</span>
                        {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;