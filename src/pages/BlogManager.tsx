import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store";
import {
    useApproveBlogApi,
    useGetBlogHook,
    useRejectBlogApi
} from "../hooks/AdminManagerHooks";

const BlogManager = () => {
    const token = useSelector((state: RootState) => state.user.user?.accessToken);
    const [page, setPage] = useState(1);

    const {
        run: fetchBlogs,
        data: paginatedData,
        loading,
    } = useGetBlogHook();

    const blogs = paginatedData?.items ?? [];
    const totalPages = paginatedData?.totalPages ?? 1;

    useEffect(() => {
        if (token) {
            fetchBlogs(page, 20, token);
        }
    }, [page, token]);

    const handle = async () => {
        if (token) {
            await fetchBlogs(page, 20, token);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Quản lý Blog</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p>Đang tải...</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog.id} className="relative bg-white shadow rounded overflow-hidden">
                            <img src={blog.featuredImageUrl} alt={blog.title} className="h-48 w-full object-cover"/>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-1 line-clamp-2">{blog.title}</h2>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-2">{blog.content}</p>
                                <div className="text-xs text-gray-400 mb-2">
                                    {blog.authorName} | {new Date(blog.publishedDate).toLocaleDateString()}
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>👁 {blog.views}</span>
                                    <span>💬 {blog.commentsCount}</span>
                                    <span>⭐ {blog.averageRating}</span>
                                    <span>
                                        {blog.status === "Published" && "🔓 Đã công khai"}
                                        {blog.status === "Pending_Approval" && "⏳ Chờ duyệt"}
                                        {blog.status === "Rejected" && "❌ Từ chối"}
                                        {blog.status === "Locked" && "🔒 Đã khóa"}
                                    </span>
                                </div>
                            </div>

                            <StatusSet status={blog.status} id={blog.id} token={token ?? ""} handle={handle}/>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-8 flex justify-center gap-3 items-center">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    Trước
                </button>
                <span className="text-sm">{page} / {totalPages}</span>
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

export default BlogManager;

type Prop = {
    id: string;
    status: string;
    token: string;
    handle: () => void;
};

const StatusSet: React.FC<Prop> = ({status, id, token, handle}) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const {run: runApprove} = useApproveBlogApi();
    const {run: runReject} = useRejectBlogApi();

    const updateBlogStatus = async (id: string, newStatus: "Published" | "Rejected" | "Locked") => {
        const confirmed = window.confirm(`Xác nhận chuyển sang trạng thái: ${newStatus}?`);
        if (!confirmed || !token) return;

        if (newStatus === "Published") {
            await runApprove(id, token);
        } else if (newStatus === "Rejected") {
            await runReject(id, token);
        }

        setOpenMenuId(null);
        await handle(); // gọi lại fetchBlogs
    };

    return (
        <div className="absolute top-2 right-2">
            <button
                onClick={() => setOpenMenuId(openMenuId === id ? null : id)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                title="Tuỳ chọn"
            >
                <span className="text-xl font-bold">⋮</span>
            </button>

            {openMenuId === id && (
                <div className="absolute z-10 right-0 mt-2 bg-white border rounded shadow w-48 text-sm">
                    <div className="px-4 py-2 text-gray-500 font-semibold border-b">
                        Trạng thái: <span className="text-black">{status}</span>
                    </div>

                    {status === "Published" && (
                        <button
                            onClick={() => updateBlogStatus(id, "Locked")}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            🔒 Khóa bài viết
                        </button>
                    )}

                    {status === "Pending_Approval" && (
                        <>
                            <button
                                onClick={() => updateBlogStatus(id, "Published")}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                ✅ Duyệt công khai
                            </button>
                            <button
                                onClick={() => updateBlogStatus(id, "Rejected")}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                            >
                                ❌ Từ chối
                            </button>
                        </>
                    )}

                    <button
                        onClick={() => setOpenMenuId(null)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-500"
                    >
                        Đóng
                    </button>
                </div>
            )}
        </div>
    );
};
