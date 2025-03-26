import Header from '../components/Header';

function Cart() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Giỏ hàng</h1>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between mb-2">
            <span>Sản phẩm 1</span>
            <div>
              <button className="px-2 text-green-700">-</button>
              <span className="px-2">1</span>
              <button className="px-2 text-green-700">+</button>
              <button className="ml-4 text-red-500">Xóa</button>
            </div>
          </div>
          <button className="mt-4 bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;