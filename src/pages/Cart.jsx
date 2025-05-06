import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

function Cart() {
  const { id, token } = JSON.parse(localStorage.getItem("user")) || {};
  const [invoices, setInvoices] = useState([]);

  // Hàm lấy danh sách invoices
  const fetchInvoices = async () => {
    try {
      const response = await fetch(
        `http://localhost:5155/api/invoice/user/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setInvoices(data);
      console.log("invoices: ", data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // Gọi fetchInvoices khi mount
  useEffect(() => {
    if (id && token) {
      fetchInvoices();
    }
  }, [id, token]);

  const handleIncrease = async (invoiceId, productId) => {
    try {
      const response = await axios.post(
        `http://localhost:5155/api/InvoiceDetail/update-quantity`,
        {
          InvoiceId: invoiceId,
          ProductId: productId,
          QuantityChange: 1, // Tăng 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Increase product quantity response:", response.data);
      await fetchInvoices(); // Re-fetch để cập nhật giao diện
    } catch (error) {
      console.error("Error increasing product quantity:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/user-login";
      } else {
        alert("Không thể tăng số lượng. Vui lòng thử lại!");
      }
    }
  };

  const handleDecrease = async (invoiceId, productId) => {
    try {
      const response = await axios.post(
        `http://localhost:5155/api/InvoiceDetail/update-quantity`,
        {
          InvoiceId: invoiceId,
          ProductId: productId,
          QuantityChange: -1, // Giảm 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Decrease product quantity response:", response.data);
      await fetchInvoices(); // Re-fetch để cập nhật giao diện
    } catch (error) {
      console.error("Error decreasing product quantity:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/user-login";
      } else {
        alert("Không thể giảm số lượng. Vui lòng thử lại!");
      }
    }
  };

  const handleDelete = async (invoiceId, productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5155/api/InvoiceDetail/remove-product/${invoiceId}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Delete product response:", response.data);
      await fetchInvoices(); // Re-fetch để cập nhật giao diện
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/user-login";
      } else {
        alert("Không thể xóa sản phẩm. Vui lòng thử lại!");
      }
    }
  };

  const cart = useMemo(() => {
    return invoices.find((item) => item.status === "PENDING") || null;
  }, [invoices]);

  const cartItems = cart?.invoiceDetails;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Giỏ hàng</h1>
        <div className="bg-white p-4 rounded shadow">
          {cartItems?.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.product.name}</span>
              <div>
                <button
                  className="px-2 text-green-700"
                  onClick={() => handleDecrease(cart.id, item.product.id)}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="px-2 text-green-700"
                  onClick={() => handleIncrease(cart.id, item.product.id)}
                >
                  +
                </button>
                <button
                  className="ml-4 text-red-500"
                  onClick={() => handleDelete(cart.id, item.product.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <button className="mt-4 bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;