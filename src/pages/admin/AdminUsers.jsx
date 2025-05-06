import axios from "axios";
import AdminHeader from "../../components/admin/AdminHeader";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Pagination from "../../components/pagination/Pagination";

// Gắn Modal vào phần tử root của ứng dụng
Modal.setAppElement("#root");

function AdminUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { token } = JSON.parse(localStorage.getItem("admin")) || {};

  // State cho modal chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    email: "",
    password: "",
    role: "USER"
  });

  // State cho modal thêm user
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  // State cho modal xác nhận xóa
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Lấy danh sách users
  const GetAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5155/api/User", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const users = response.data;
      setAllUsers(users);
      setTotalItems(users.length);
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn!");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    if (token) {
      GetAllUsers();
    }
  }, [token]);

  // Cập nhật users hiển thị khi đổi trang
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setCurrentUsers(allUsers.slice(start, end));
  }, [currentPage, pageSize, allUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Hàm mở modal chỉnh sửa
  const openEditModal = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5155/api/User/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const user = response.data;

      setSelectedUser(user);
      setEditFormData({
        email: user.email ?? "",
        password: "", // Không điền sẵn password để bảo mật
        role: "USER"
      });
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        alert("Không thể lấy thông tin user. Vui lòng thử lại!");
      }
    }
  };

  // Hàm đóng modal chỉnh sửa
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setEditFormData({
      email: "",
      password: "",
      role: "USER",
    });
  };

  // Hàm mở modal thêm user
  const openAddModal = () => {
    setAddFormData({
      email: "",
      password: "",
      role: "USER",
    });
    setIsAddModalOpen(true);
  };

  // Hàm đóng modal thêm user
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setAddFormData({
      email: "",
      password: "",
      role: "USER",
    });
  };

  // Hàm mở modal xác nhận xóa
  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  // Hàm đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Hàm xử lý thay đổi input (chung cho cả edit và add)
  const handleInputChange = (e, setFormData, formData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  };

  // Hàm thêm user
  const handleAddUser = async (newUserData) => {
    try {
      if (!newUserData.email.trim() || !newUserData.password.trim()) {
        throw new Error("Vui lòng điền đầy đủ email và password!");
      }

      const response = await axios.post(
        `http://localhost:5155/api/User/add`,
        newUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newUsers = [...allUsers, response.data];
      setAllUsers(newUsers);
      setTotalItems(newUsers.length);
      closeAddModal();

      const maxPage = Math.ceil(newUsers.length / pageSize);
      if (currentPage < maxPage) {
        setCurrentPage(maxPage);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Không thể thêm user. Vui lòng thử lại!";
        alert(errorMessage);
      }
    }
  };

  // Hàm cập nhật user
  const handleUpdateUser = async (userId, updatedData) => {
    try {
      if (!updatedData.email.trim()) {
        throw new Error("Email không được để trống!");
      }

      const response = await axios.put(
        `http://localhost:5155/api/User/update/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUsers = allUsers.map((user) =>
        user.id === userId ? { ...user, ...response.data } : user
      );
      setAllUsers(updatedUsers);
      closeEditModal();
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        const errorMessage =
          error.response?.data?.message ||
          "Không thể cập nhật user. Vui lòng thử lại!";
        alert(errorMessage);
      }
    }
  };

  // Hàm xóa user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5155/api/User/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUsers = allUsers.filter((user) => user.id !== userId);
      setAllUsers(updatedUsers);

      const newTotalItems = updatedUsers.length;
      const maxPage = Math.ceil(newTotalItems / pageSize);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
      setTotalItems(newTotalItems);
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        alert("Không thể xóa user. Vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Quản lý user</h1>
        <button
          onClick={openAddModal}
          className="mb-4 bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300"
        >
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
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => openEditModal(user.id)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => openDeleteModal(user.id)}
                    >
                      Xóa
                    </button>
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

      {/* Modal chỉnh sửa user */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-green-800">
          Chỉnh sửa user
        </h2>
        {selectedUser && (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={(e) =>
                  handleInputChange(e, setEditFormData, editFormData)
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Password (để trống nếu không thay đổi)
              </label>
              <input
                type="password"
                name="password"
                value={editFormData.password}
                onChange={(e) =>
                  handleInputChange(e, setEditFormData, editFormData)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => handleUpdateUser(selectedUser.id, editFormData)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Lưu
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal thêm user */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-green-800">
          Thêm user mới
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={addFormData.email}
              onChange={(e) =>
                handleInputChange(e, setAddFormData, addFormData)
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={addFormData.password}
              onChange={(e) =>
                handleInputChange(e, setAddFormData, addFormData)
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeAddModal}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={() => handleAddUser(addFormData)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-green-800">Xác nhận xóa</h2>
        <p className="mb-4 text-gray-700">
          Bạn có chắc chắn muốn xóa user này không?
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeDeleteModal}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => handleDeleteUser(userToDelete)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminUsers;