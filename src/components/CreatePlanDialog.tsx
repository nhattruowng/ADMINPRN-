import React, {useState} from "react";
import {useCreateNewBlan} from "../hooks/AdminManagerHooks.ts";

interface CreatePlanDialogProps {
    isOpen: boolean;
    onClose: () => void;
    token: string;
    handle: () => void;
}

type FormDataState = {
    name: string;
    type: number;
    price: number;
    description: string;
    durationMonths: number;
    features: string;
};

const defaultForm: FormDataState = {
    name: "",
    type: 0,
    price: 0,
    description: "",
    durationMonths: 0,
    features: ""
};

const CreatePlanDialog: React.FC<CreatePlanDialogProps> = ({isOpen, onClose, token, handle}) => {
    const [formData, setFormData] = useState<FormDataState>(defaultForm);

    const {run: runCreatePlan} = useCreateNewBlan();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "type" || name === "price" || name === "durationMonths" ? Number(value) : value
        }));
    };

    const handleSubmit = async () => {
        await runCreatePlan(formData, token);
        setFormData(defaultForm);
        await handle();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">➕ Thêm Gói Đăng Ký Mới</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tên gói"
                        className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={0}>🎁 Free</option>
                        <option value={1}>📦 Basic</option>
                        <option value={2}>💎 Premium</option>
                        <option value={3}>🏢 Enterprise</option>
                    </select>

                    <div className="flex gap-3">
                        <div className="w-1/2">
                            <label className="block text-sm text-gray-700 mb-1">Giá (VNĐ)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Nhập giá"
                                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm text-gray-700 mb-1">Thời hạn (tháng)</label>
                            <input
                                type="number"
                                name="durationMonths"
                                value={formData.durationMonths}
                                onChange={handleChange}
                                placeholder="Nhập thời hạn"
                                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>


                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Mô tả"
                        className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        rows={2}
                    />

                    <textarea
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                        placeholder="Tính năng"
                        className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-100 transition"
                    >
                        ❌ Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        ✅ Tạo mới
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePlanDialog;
