import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  const { id, token } = JSON.parse(localStorage.getItem("user")) || {};
  
  

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
      return;
    }

    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5155/api/Invoice/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setInvoices(response.data); // Lưu hóa đơn, kể cả khi rỗng
      } catch (error) {
        console.error("Error fetching invoices:", error);
        if (error.response?.status === 401) {
          alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
          localStorage.removeItem("user");
          navigate("/user-login");
        }
      }
    };
    fetchInvoices();
  }, [id, token, navigate]);

  const cart = useMemo(() => {
    return invoices.find((item) => item.status === "PENDING") || null;
  }, [invoices]);

  useEffect(() => {
    if (!token) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5155/api/Product", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("products ",response.data);
        
        if (response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error.response?.status === 401) {
          alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
          localStorage.removeItem("user");
          navigate("/user-login");
        }
      }
    };
    fetchProducts();
  }, [token, navigate]);

  const handleAddToCart = async (id) => {
    try {
      let invoiceId = cart?.id;
      if (!invoiceId) {
        const response = await axios.post(
          `http://localhost:5155/api/Invoice/create`,
          { userId: id, status: "PENDING" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        invoiceId = response.data.id;
        setInvoices([...invoices, response.data]);
      }

      const response = await axios.post(
        `http://localhost:5155/api/InvoiceDetail/add`,
        {
          InvoiceId: invoiceId,
          ProductId: id,
          Quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Add to cart response:", response.data);
      alert("Thêm vào giỏ hàng thành công!");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        navigate("/user-login");
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-800 drop-shadow-md">
          Danh Sách Sản Phẩm
        </h1>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full max-w-md p-3 border-2 border-green-500 rounded-full shadow-sm focus:outline-none focus:border-green-700 transition duration-300"
          />
          <Link
            to="/cart"
            className="flex items-center ml-4 bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700"
          >
            Xem giỏ hàng
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600">
                  {product.price.toLocaleString("vi-VN")} VNĐ
                </p>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="mt-3 w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            Không tìm thấy sản phẩm nào!
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;