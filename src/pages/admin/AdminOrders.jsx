import axios from "axios";
import AdminHeader from "../../components/admin/AdminHeader";
import { useEffect, useState } from "react";
import Modal from "react-modal";

// Gắn Modal vào phần tử root của ứng dụng
Modal.setAppElement("#root");

function AdminOrders() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("user")) || {};

  // Hardcode userId theo yêu cầu
  const userId = "13101c92-7ce0-4202-8f53-a6f3af28b227";

  // Lấy danh sách hóa đơn theo userId
  const GetInvoicesByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5155/api/invoice/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const allInvoices = response.data;

      // Lọc chỉ lấy hóa đơn có status là "SUCCESS"
      const successInvoices = allInvoices.filter(
        (invoice) => invoice.status === "SUCCESS"
      );
      setInvoices(successInvoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn!");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        alert("Không thể lấy danh sách hóa đơn. Vui lòng thử lại!");
      }
    }
  };

  useEffect(() => {
    if (token) {
      GetInvoicesByUser();
    }
  }, [token]);

  // Hàm mở modal chi tiết hóa đơn
  const openDetailModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailModalOpen(true);
  };

  // Hàm đóng modal chi tiết hóa đơn
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">
          Quản lý hóa đơn
        </h1>
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Email người dùng</th>
                <th className="p-2">Tổng tiền</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b">
                  <td className="p-2">{invoice.id}</td>
                  <td className="p-2">{invoice.users.email}</td>
                  <td className="p-2">
                    {invoice.totalAmount.toLocaleString("vi-VN")} VNĐ
                  </td>
                  <td className="p-2">{invoice.status}</td>
                  <td className="p-2">
                    <button
                      className="text-blue-500"
                      onClick={() => openDetailModal(invoice)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal xem chi tiết hóa đơn */}
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={closeDetailModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-green-800">
          Chi tiết hóa đơn
        </h2>
        {selectedInvoice && (
          <div>
            {/* Thông tin hóa đơn */}
            <div className="mb-4">
              <p>
                <strong>ID hóa đơn:</strong> {selectedInvoice.id}
              </p>
              <p>
                <strong>Email người dùng:</strong> {selectedInvoice.users.email}
              </p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                {selectedInvoice.totalAmount.toLocaleString("vi-VN")} VNĐ
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedInvoice.status}
              </p>
            </div>

            {/* Danh sách chi tiết hóa đơn */}
            <h3 className="text-lg font-semibold mb-2">Chi tiết sản phẩm</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Tên sản phẩm</th>
                  <th className="p-2">Mô tả</th>
                  <th className="p-2">Giá</th>
                  <th className="p-2">Số lượng</th>
                  <th className="p-2">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.invoiceDetails.map((detail) => (
                  <tr key={detail.id} className="border-b">
                    <td className="p-2">{detail.product.name}</td>
                    <td className="p-2">{detail.product.description}</td>
                    <td className="p-2">
                      {detail.product.price.toLocaleString("vi-VN")} VNĐ
                    </td>
                    <td className="p-2">{detail.quantity}</td>
                    <td className="p-2">
                      {detail.amount.toLocaleString("vi-VN")} VNĐ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Hiển thị hình ảnh sản phẩm (nếu có) */}
            {selectedInvoice.invoiceDetails.some(
              (detail) => detail.product.imageUrl
            ) && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Hình ảnh sản phẩm</h3>
                <div className="flex gap-4 flex-wrap">
                  {selectedInvoice.invoiceDetails.map(
                    (detail) =>
                      detail.product.imageUrl && (
                        <img
                          key={detail.id}
                          src={detail.product.imageUrl}
                          alt={detail.product.name}
                          className="w-32 h-32 object-cover"
                        />
                      )
                  )}
                </div>
              </div>
            )}

            {/* Nút đóng modal */}
            <div className="flex justify-end mt-4">
              <button
                onClick={closeDetailModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminOrders;