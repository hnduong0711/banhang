import AdminHeader from '../../components/admin/AdminHeader';

function AdminChat() {
  const users = [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Chat với User</h1>
        <div className="flex gap-4">
          <div className="w-1/4 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Danh sách User</h2>
            {users.map((user) => (
              <div key={user.id} className="p-2 border-b hover:bg-gray-100 cursor-pointer">
                {user.username}
              </div>
            ))}
          </div>
          <div className="w-3/4 bg-white p-4 rounded shadow">
            <div className="h-64 overflow-y-auto mb-4">
              <p className="text-gray-800">User1: Xin chào Admin!</p>
              <p className="text-green-800">Admin: Chào bạn!</p>
            </div>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="w-full p-2 border-2 border-green-500 rounded focus:outline-none focus:border-green-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminChat;