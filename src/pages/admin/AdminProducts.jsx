import AdminHeader from '../../components/admin/AdminHeader';

function AdminProducts() {
  const products = [
    { id: 1, name: 'Áo Thun Xanh', price: 150000 },
    { id: 2, name: 'Quần Jeans Đen', price: 300000 },
  ];

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
              {products.map((product) => (
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
      </div>
    </div>
  );
}

export default AdminProducts;