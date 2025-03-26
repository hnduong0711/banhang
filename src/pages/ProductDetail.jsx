import Header from '../components/Header';

function ProductDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Chi tiết sản phẩm</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 bg-white p-4 rounded shadow">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Sản phẩm"
              className="w-full h-64 object-cover rounded"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800">Tên sản phẩm</h2>
            <p className="text-gray-600">Mô tả sản phẩm</p>
            <button className="mt-4 bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;