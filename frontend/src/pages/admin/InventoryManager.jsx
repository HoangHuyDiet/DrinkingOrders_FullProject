import React, {useEffect, useState} from "react";
import { getMenu } from "../../services/ProductService";
import { importStock } from "../../services/InventoryService";

const InventoryManager = () => {
    const [products, setProducts] = useState([]);

    //Load danh sách món
    const fetchProducts = () => {
        getMenu().then(setProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    //Xử lý nhập kho
    const handleImport = async (product) => {
        //Hỏi số lượng muốn nhập
        const amountStr = prompt(`Nhập số lượng muốn thêm cho món"${product.name}":`);

        if (amountStr) {
            const amount = parseInt(amountStr);
            if (isNaN(amount) || amount <= 0) {
                alert("Vui lòng nhập số nguyên dương!");
                return;
            }

            try {
                await importStock(product.id, amount);
                alert(`Đã nhập thêm ${amount} cái vào kho!`);
                fetchProducts();
            } catch (error) {
                alert("Lỗi nhập kho! Kiểm tra lại server.");
            }
        }
    };

    return (
        <div className="text-2xl font-bold text-[#4a3b36] mb-6 border-l-4 border-[#c6a87c] pl-4">
            <h2>
                Quản lý Kho Hàng
            </h2>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#4a3b36] text-white">
                        <tr>
                            <th className="p-4">Mã</th>
                            <th className="p-4">Tên món</th>
                            <th className="p-4 text-center">Tồn kho hiện tại</th>
                            <th className="p-4 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 text-gray-500">#{p.id}</td>
                                <td className="p-4 font-bold text-[#4a3b36] flex items-center gap-3">
                                    <img src={p.image} className="w-10 h-10 rounded object-cover" alt=""/>
                                    {p.name}
                                </td>

                                <td className="p-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                        (p.quantity || 0) < 10 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600" 
                                    }`}>
                                        {p.quantity || 0}
                                    </span>
                                </td>

                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handleImport(p)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition shadow-sm text-sm font-bold"
                                    >
                                        + Nhập Hàng
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default InventoryManager;