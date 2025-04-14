import axios from 'axios';
import AdminHeader from '../../components/admin/AdminHeader';
import { use, useEffect, useState } from 'react';

function AdminUsers() {
  const [users, setAllUsers] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  const GetAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5155/api/User', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const users = response.data;
      setAllUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 401) {
        alert('Phiên đăng nhập hết hạn!');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
  }

  useEffect(() => {
    GetAllUsers();
  });



  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Quản lý user</h1>
        <button className="mb-4 bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300">
          Thêm user
        </button>
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
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

export default AdminUsers;