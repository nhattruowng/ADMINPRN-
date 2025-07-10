import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import Login from "../pages/Login.tsx";
import type {JSX} from "react/jsx-runtime";
import UserManager from "../pages/UserManager.tsx";
import BlogManager from "../pages/BlogManager.tsx";
import SubscriptionPlanManager from "../pages/SubscriptionPlanManager.tsx";
import QuitPlanPage from "../pages/QuitPlanList.tsx";
import AdminDashboardPage from "../pages/AdminDashboardPage.tsx";

interface AppRouterProps {
    isDark?: boolean;
    toggleTheme?: () => void;
}

export const AppRouter: React.FC<AppRouterProps> = ({isDark, toggleTheme}) => {
    const user = useSelector((state: RootState) => state.user.user);
    console.log(user);
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout isDark={isDark} toggleTheme={toggleTheme}/>
                    </ProtectedRoute>
                }
            >
                {/*<Route index element={<MainLayout/>}/>*/}
                {/*<Route path="profile" element={<AdminProfile adminUser={user}/>}/>*/}
                <Route path="blogs-manager" element={<BlogManager/>}/>
                <Route path="member-ship-package-mng" element={<SubscriptionPlanManager/>}/>
                <Route path="quitplan-mng" element={<QuitPlanPage/>}/>
                <Route path="total" element={<AdminDashboardPage/>}/>
                <Route path="users" element={<UserManager/>}/>
            </Route>
            <Route path="/login" element={
                <GuestRoute>
                    <Login/>
                </GuestRoute>}/>

            {/*<Route path="/forgot-password" element={*/}
            {/*    <GuestRoute>*/}
            {/*        <ForgotPassword/>*/}
            {/*    </GuestRoute>}/>*/}
        </Routes>
    );
};

const ProtectedRoute = ({children}: { children: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.user.user);
    return user ? children : <Navigate to="/login" replace/>;
};
const GuestRoute = ({children}: { children: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.user.user);
    return user != null ? <Navigate to="/" replace/> : children;
};