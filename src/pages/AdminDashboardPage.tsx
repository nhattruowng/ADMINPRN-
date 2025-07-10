import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store";
import {useGetAdminDashboards} from "../hooks/AdminManagerHooks.ts";


const AdminDashboardPage = () => {
    const token = useSelector((state: RootState) => state.user.user?.accessToken);

    const {run: fetchDashboardData, data} = useGetAdminDashboards();

    useEffect(() => {
        const fetchData = async () => {
            await fetchDashboardData(token ?? "")
        };

        if (token) fetchData();
    }, [token]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Tổng quan hệ thống</h1>

            {!data ? (
                <p>Đang tải...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DashboardCard label="Tổng người dùng" value={data.data.totalUsers}/>
                    <DashboardCard label="Người dùng mới (tháng này)" value={data.data.newUsersThisMonth}/>
                    <DashboardCard label="Tổng blog" value={data.data.totalBlogs}/>
                    <DashboardCard label="Blog đã công khai" value={data.data.publishedBlogs}/>
                    <DashboardCard label="Blog chờ duyệt" value={data.data.pendingBlogs}/>
                    <DashboardCard label="Tổng lượt đánh giá" value={data.data.totalRatings}/>
                    <DashboardCard label="Điểm đánh giá TB" value={data.data.averageRating.toFixed(1)}/>
                    <DashboardCard label="Tổng kế hoạch bỏ thuốc" value={data.data.totalQuitPlans}/>
                    <DashboardCard label="Kế hoạch đang hoạt động" value={data.data.activeQuitPlans}/>
                    <DashboardCard label="Kế hoạch hoàn tất" value={data.data.completedQuitPlans}/>
                    <DashboardCard label="Tổng doanh thu" value={data.data.totalRevenue.toLocaleString() + " đ"}/>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;

type DashboardCardProps = {
    label: string;
    value: string | number;
};

const DashboardCard: React.FC<DashboardCardProps> = ({label, value}) => (
    <div className="bg-white rounded-xl shadow p-4 border hover:shadow-md transition">
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <p className="text-xl font-semibold text-blue-600">{value}</p>
    </div>
);
