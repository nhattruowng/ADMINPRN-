import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import {TbLogout} from "react-icons/tb";
import {clearUser} from "../store/userSlice.ts.ts";


interface NavbarProps {
    isDark: boolean;
    toggleTheme?: () => void;
}

export const Header: React.FC<NavbarProps> = ({isDark, toggleTheme}: NavbarProps) => {
    const dispatch = useDispatch();
    console.log(isDark);
    console.log(toggleTheme);
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();


    const handleLogOut = () => {
        const confirmed = window.confirm("Đăng xuất")
        if (confirmed) {
            dispatch(clearUser())
        }
    }

    return (
        <nav
            className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-xl font-bold text-gray-900 dark:text-white"></span>
                        </Link>
                    </div>

                    <div className="flex-1 mx-4">
                    </div>

                    <div className="flex items-center space-x-4">

                        <button className="flex items-center gap-2 p-2 focus:outline-none"
                                onClick={() => navigate("/profile")}>
                            <div className="relative">
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={user?.userImage}
                                    alt="User"
                                />
                            </div>
                            <div className="flex flex-col text-left leading-tight">
                                <span className="text-sm font-semibold text-white">{user?.fullName}</span>
                            </div>
                        </button>
                        <div className="relative">
                            <button className="flex items-center p-1 focus:outline-none"
                                    onClick={handleLogOut}
                            >
                                <TbLogout className="w-6 h-6 text-gray-500 dark:text-gray-400"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};