import React, {useEffect, useState} from "react";
import type {QuitPlan} from "../modole/QuitPlan.ts";
import {useGetAllQuitPlan} from "../hooks/AdminManagerHooks.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

const QuitPlanPage = () => {
    const token = useSelector((state: RootState) => state.user.user?.accessToken);
    const [page, setPage] = useState<number>(1);

    const {
        run: fetchQuitPlans,
        data
    } = useGetAllQuitPlan();

    const fetchData = async () => {
        await fetchQuitPlans(page, token ?? "");
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <QuitPlanList
            items={data?.items ?? []}
            page={page}
            totalPages={data?.totalPages ?? 1}
            onPageChange={setPage}
        />
    );
};

export default QuitPlanPage;


type Props = {
    items: QuitPlan[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const QuitPlanList: React.FC<Props> = ({items, page, totalPages, onPageChange}) => {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Danh sách kế hoạch bỏ thuốc</h1>

            <div className="grid gap-6 md:grid-cols-2">
                {items.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition"
                    >
                        <div className="mb-2">
                            <span className="font-semibold text-lg">{plan.reason}</span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                            <p>📦 Gói: <span className="font-medium">{plan.packageName}</span></p>
                            <p>🗓️
                                Từ: {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.targetDate).toLocaleDateString()}</p>
                            <p>🚬 Số điếu/ngày trước khi bỏ: {plan.cigarettesPerDayBeforeQuit}</p>
                            <p>📆 Số năm hút thuốc: {plan.yearsSmokingBeforeQuit}</p>
                            <p>🟢 Trạng thái: {plan.status}</p>
                            <p>🌿 Số ngày bỏ thuốc: {plan.smokeFreeDays} ngày</p>
                            <p>🩺 Tác động sức khoẻ: {plan.healthImpact.summary}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-4">
                <button
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                >
                    ← Trước
                </button>

                <span className="text-sm">Trang {page} / {totalPages}</span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                >
                    Sau →
                </button>
            </div>
        </div>
    );
};

