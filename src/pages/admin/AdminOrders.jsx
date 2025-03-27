import AdminHeader from '../../components/admin/AdminHeader';

function AdminOrders() {
  const orders = [
    { id: 1, user: 'user1', total: 450000, date: '2025-03-26' },
    { id: 2, user: 'user2', total: 500000, date: '2025-03-25' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Quản lý hóa đơn</h1>
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">User</th>
                <th className="p-2">Tổng tiền</th>
                <th className="p-2">Ngày</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.user}</td>
                  <td className="p-2">{order.total.toLocaleString('vi-VN')} VNĐ</td>
                  <td className="p-2">{order.date}</td>
                  <td className="p-2">
                    <button className="text-blue-500">Xem chi tiết</button>
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

export default AdminOrders;