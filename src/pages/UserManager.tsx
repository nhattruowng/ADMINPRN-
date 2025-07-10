import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import {useAdminManagerUserHook, useDeleteUSer} from "../hooks/AdminManagerHooks.ts";

const UserManager = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const {
        run: runAdminManagerUserHook,
        loading: loadAdminManagerUserHook,
        data: userData,
    } = useAdminManagerUserHook();

    const {
        run: runuseDeleteUSer,
    } = useDeleteUSer()

    const fetchUsers = async () => {
        await runAdminManagerUserHook(page, 20, user?.accessToken ?? "");
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("Bạn có chắc muốn xoá người dùng này?");
        if (!confirmed) return;

        console.log(id);
        await runuseDeleteUSer(id, user?.accessToken ?? "")
        fetchUsers();
    };

    useEffect(() => {
        if (user?.accessToken) {
            fetchUsers();
        }
    }, [page, user?.accessToken]);

    useEffect(() => {
        if (userData?.totalPages) {
            setTotalPages(userData.totalPages);
        }
    }, [userData]);

    const filteredUsers = userData?.items.filter((u) =>
        u.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">User Manager</h2>


            <div className="mb-4">
                <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="Tìm theo tên..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loadAdminManagerUserHook ? (
                <p>Đang tải...</p>
            ) : (
                <div className="grid gap-4">
                    {filteredUsers?.length ? (
                        filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white flex items-center justify-between border p-4 rounded shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={user.userImage}
                                        alt="Avatar"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">{user.fullName}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Xoá
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Không có người dùng nào.</p>
                    )}
                </div>
            )}

            {/* Phân trang */}
            <div className="mt-6 flex justify-center gap-2">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    Trước
                </button>
                <span className="px-4 py-1">{page} / {totalPages}</span>
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Sau
                </button>
            </div>
        </div>
    );
};

export default UserManager;
