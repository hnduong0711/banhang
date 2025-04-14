import { useEffect, useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Pagination from '../../components/pagination/Pagination';
import axios from 'axios';

function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]); // Lưu toàn bộ sản phẩm
  const [currentProducts, setCurrentProducts] = useState([]); // Sản phẩm trên trang hiện tại
  const [totalItems, setTotalItems] = useState(0); // Tổng số sản phẩm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(10); // Số sản phẩm mỗi trang
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5155/api/Product', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const products = response.data;
        setAllProducts(products);
        setTotalItems(products.length);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response?.status === 401) {
          alert('Phiên đăng nhập hết hạn!');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    };
    if (token) {
      fetchProducts();
    }
  }, [token]);

  // Cập nhật sản phẩm hiển thị khi đổi trang
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setCurrentProducts(allProducts.slice(start, end));
  }, [currentPage, pageSize, allProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Quản lý sản phẩm</h1>
        <button className="mb-4 bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300">
          Thêm sản phẩm
        </button>
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Tên sản phẩm</th>
                <th className="p-2">Giá</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-2">{product.id}</td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.price.toLocaleString('vi-VN')} VNĐ</td>
                  <td className="p-2">
                    <button className="text-blue-500 mr-2">Sửa</button>
                    <button className="text-red-500">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default AdminProducts;