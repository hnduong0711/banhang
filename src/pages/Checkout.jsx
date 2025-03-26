import Header from '../components/Header';

function Checkout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Thanh toán</h1>
        <form className="bg-white p-4 rounded shadow">
          <input
            type="text"
            placeholder="Địa chỉ"
            className="w-full p-2 mb-2 border-2 border-green-500 rounded focus:outline-none focus:border-green-700"
          />
          <button className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300">
            Xác nhận thanh toán
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;