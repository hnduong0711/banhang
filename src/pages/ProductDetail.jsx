import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const {token, user} = JSON.parse(localStorage.getItem("user"));

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5155/api/Product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
        
        if (response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id, token]);

  if(product===null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">
          Chi tiết sản phẩm
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-fit md:w-1/2 bg-white p-4 rounded shadow">
            <img
              src={product.imageUrl}
              alt="Sản phẩm"
              className="w-4/5 object-cover rounded flex m-auto"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4 p-4 ">
            <h2 className="text-4xl font-semibold text-gray-800">
              {product ? product.name : "Tên sản phẩm"}
            </h2>
            <p className="text-gray-600">Giá: {product.price}</p>
            <p className="text-gray-600">Số lượng còn lại: {product.quantity}</p>
            <button className="mt-4 bg-gradient-to-r from-green-600 to-green-800 cursor-pointer text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
