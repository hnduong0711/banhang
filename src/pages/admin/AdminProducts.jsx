import { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import Pagination from "../../components/pagination/Pagination";
import axios from "axios";
import Modal from "react-modal";

// Gắn Modal vào phần tử root của ứng dụng
Modal.setAppElement("#root");

function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { token } = JSON.parse(localStorage.getItem("user")) || {};

  // State cho modal chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    Name: "",
    Description: "",
    Price: 0,
    Quantity: 0,
    Image: null,
  });

  // State cho modal thêm sản phẩm
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    Name: "",
    Description: "",
    Price: 0,
    Quantity: 0,
    Image: null,
  });

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5155/api/Product", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const products = response.data;
        setAllProducts(products);
        setTotalItems(products.length);
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error.response?.status === 401) {
          alert("Phiên đăng nhập hết hạn!");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    };
    if (token) {
      fetchProducts();
    }
  }, [token]);

  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setCurrentProducts(allProducts.slice(start, end));
  }, [currentPage, pageSize, allProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Hàm mở modal chỉnh sửa
  const openEditModal = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:5155/api/Product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const product = response.data;

      setSelectedProduct(product);
      setEditFormData({
        Name: product.name ?? "",
        Description: product.description ?? "",
        Price: product.price ?? 0,
        Quantity: product.quantity ?? 0,
        Image: null,
      });
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        alert("Không thể lấy thông tin sản phẩm. Vui lòng thử lại!");
      }
    }
  };

  // Hàm đóng modal chỉnh sửa
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setEditFormData({
      Name: "",
      Description: "",
      Price: 0,
      Quantity: 0,
      Image: null,
    });
  };

  // Hàm mở modal thêm sản phẩm
  const openAddModal = () => {
    setAddFormData({
      Name: "",
      Description: "",
      Price: 0,
      Quantity: 0,
      Image: null,
    });
    setIsAddModalOpen(true);
  };

  // Hàm đóng modal thêm sản phẩm
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setAddFormData({
      Name: "",
      Description: "",
      Price: 0,
      Quantity: 0,
      Image: null,
    });
  };

  // Hàm xử lý thay đổi input (chung cho cả edit và add)
  const handleInputChange = (e, setFormData, formData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý thay đổi file ảnh (chung cho cả edit và add)
  const handleFileChange = (e, setFormData, formData) => {
    setFormData({ ...formData, Image: e.target.files[0] });
  };

  // Hàm thêm sản phẩm
  const handleAddProduct = async (newProductData) => {
    try {
      const formData = new FormData();
      formData.append("Name", newProductData.Name);
      formData.append("Description", newProductData.Description);
      formData.append("Price", newProductData.Price);
      formData.append("Quantity", newProductData.Quantity);

      if (newProductData.Image && newProductData.Image instanceof File) {
        formData.append("Image", newProductData.Image);
      } else {
        throw new Error("Vui lòng chọn ảnh cho sản phẩm!");
      }

      const response = await axios.post(
        `http://localhost:5155/api/Product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added:", response.data);

      // Thêm sản phẩm mới vào danh sách
      setAllProducts([...allProducts, response.data]);
      setTotalItems(allProducts.length + 1);
      closeAddModal();
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/user-login";
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Không thể thêm sản phẩm. Vui lòng thử lại!";
        alert(errorMessage);
      }
    }
  };

  // Hàm cập nhật sản phẩm
  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const formData = new FormData();
      formData.append("Name", updatedData.Name);
      formData.append("Description", updatedData.Description);
      formData.append("Price", updatedData.Price);
      formData.append("Quantity", updatedData.Quantity);

      // Chỉ append Image nếu người dùng chọn file ảnh mới
      if (updatedData.Image && updatedData.Image instanceof File) {
        formData.append("Image", updatedData.Image);
      }

      const response = await axios.put(
        `http://localhost:5155/api/Product/update/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product updated:", response.data);

      const updatedProducts = allProducts.map((product) =>
        product.id === productId ? { ...product, ...response.data } : product
      );
      setAllProducts(updatedProducts);
      closeEditModal();
    } catch (error) {
      console.error("Error updating product:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/user-login";
      } else {
        const errorMessage =
          error.response?.data?.message ||
          "Không thể cập nhật sản phẩm. Vui lòng thử lại!";
        alert(errorMessage);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5155/api/Product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Product deleted:", response.data);

      const updatedProducts = allProducts.filter(
        (product) => product.id !== productId
      );
      setAllProducts(updatedProducts);
      setTotalItems(updatedProducts.length);
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        alert("Không thể xóa sản phẩm. Vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">
          Quản lý sản phẩm
        </h1>
        <button
          onClick={openAddModal}
          className="mb-4 bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300"
        >
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
                  <td className="p-2">
                    {product.price.toLocaleString("vi-VN")} VNĐ
                  </td>
                  <td className="p-2">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => openEditModal(product.id)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteProduct(product.id)}
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

      {/* Modal chỉnh sửa sản phẩm */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-green-800">
          Chỉnh sửa sản phẩm
        </h2>
        {selectedProduct && (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Tên sản phẩm</label>
              <input
                type="text"
                name="Name"
                value={editFormData.Name}
                onChange={(e) =>
                  handleInputChange(e, setEditFormData, editFormData)
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Mô tả</label>
              <textarea
                name="Description"
                value={editFormData.Description}
                onChange={(e) =>
                  handleInputChange(e, setEditFormData, editFormData)
                }
                className="w-full p-2 border rounded"
                rows="3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Giá</label>
              <input
                type="number"
                name="Price"
                value={editFormData.Price}
                onChange={(e) =>
                  handleInputChange(e, setEditFormData, editFormData)
                }
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Số lượng</label>
              <input
                type="number"
                name="Quantity"
                value={editFormData.Quantity}
                onChange={(e) =>
                  handleInputChange(e, setEditFormData, editFormData)
                }
                className="w-full p-2 border rounded"
                min="0"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Ảnh sản phẩm</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(e, setEditFormData, editFormData)
                }
                className="w-full p-2 border rounded"
              />
              {selectedProduct.imagePath && !editFormData.Image && (
                <div className="mt-2">
                  <p>Ảnh hiện tại:</p>
                  <img
                    src={`http://localhost:5155${selectedProduct.imagePath}`}
                    alt={selectedProduct.name}
                    className="w-32 h-32 object-cover mt-1"
                  />
                </div>
              )}
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
                onClick={() =>
                  handleUpdateProduct(selectedProduct.id, editFormData)
                }
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Lưu
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal thêm sản phẩm */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-green-800">
          Thêm sản phẩm mới
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Tên sản phẩm</label>
            <input
              type="text"
              name="Name"
              value={addFormData.Name}
              onChange={(e) =>
                handleInputChange(e, setAddFormData, addFormData)
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Mô tả</label>
            <textarea
              name="Description"
              value={addFormData.Description}
              onChange={(e) =>
                handleInputChange(e, setAddFormData, addFormData)
              }
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Giá</label>
            <input
              type="number"
              name="Price"
              value={addFormData.Price}
              onChange={(e) =>
                handleInputChange(e, setAddFormData, addFormData)
              }
              className="w-full p-2 border rounded"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Số lượng</label>
            <input
              type="number"
              name="Quantity"
              value={addFormData.Quantity}
              onChange={(e) =>
                handleInputChange(e, setAddFormData, addFormData)
              }
              className="w-full p-2 border rounded"
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Ảnh sản phẩm</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e, setAddFormData, addFormData)
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
              onClick={() => handleAddProduct(addFormData)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AdminProducts;