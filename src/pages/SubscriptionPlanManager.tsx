import React, {useEffect, useState} from "react";
import {useGetMemberShipPackages} from "../hooks/AdminManagerHooks.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import CreatePlanDialog from "../components/CreatePlanDialog.tsx";

const SubscriptionPlanManager: React.FC = () => {
    const token = useSelector((state: RootState) => state.user.user?.accessToken);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);

    const {
        run: runUseGetMemberShipPackages,
        data: dataUseGetMemberShipPackages,
        loading: loadingGetMemberShipPackages,
    } = useGetMemberShipPackages();

    const fetchPlans = async () => {
        await runUseGetMemberShipPackages(page, token ?? "");
    };

    useEffect(() => {
        fetchPlans();
    }, [page]);

    useEffect(() => {
        setTotalPages(dataUseGetMemberShipPackages?.totalPages ?? 1);
    }, [dataUseGetMemberShipPackages]);

    const handleAdd = () => setOpen(true);
    

    return (
        <>
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">📦 Quản lý Gói Đăng Ký</h1>
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        ➕ Thêm mới
                    </button>
                </div>

                {/* Loading */}
                {loadingGetMemberShipPackages ? (
                    <p className="text-center text-gray-500">Đang tải...</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {dataUseGetMemberShipPackages?.items.map((plan) => (
                            <div
                                key={plan.id}
                                className="relative bg-white rounded-2xl shadow-lg p-5 border border-gray-200 hover:shadow-xl transition"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-xl font-bold text-gray-700">{plan.name}</h2>
                                    <span
                                        className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                        {plan.type}
                                    </span>
                                </div>

                                <div className="text-sm text-gray-600 space-y-1 mb-3">
                                    <p><strong>💰 Giá:</strong> {plan.price.toLocaleString()}đ</p>
                                    <p><strong>⏳ Thời hạn:</strong> {plan.durationMonths} tháng</p>
                                </div>

                                <p className="text-sm text-gray-800 mb-2">
                                    <strong>📄 Mô tả:</strong> {plan.description}
                                </p>

                                <p className="text-sm text-gray-800 whitespace-pre-line">
                                    <strong>✨ Tính năng:</strong> {plan.features}
                                </p>

                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-10 flex justify-center items-center gap-4">
                    <button
                        className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        disabled={page <= 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ◀ Trước
                    </button>
                    <span className="text-sm text-gray-600 font-medium">
                        Trang {page} / {totalPages}
                    </span>
                    <button
                        className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        disabled={page >= totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Sau ▶
                    </button>
                </div>
            </div>

            {/* Form tạo mới */}
            <CreatePlanDialog
                isOpen={open}
                onClose={() => setOpen(false)}
                token={token ?? ""}
                handle={fetchPlans}
            />
        </>
    );
};

export default SubscriptionPlanManager;
