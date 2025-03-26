import Header from '../components/Header';

function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Thông tin người dùng</h1>
        <form className="bg-white p-4 rounded shadow">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-2 border-2 border-green-500 rounded focus:outline-none focus:border-green-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border-2 border-green-500 rounded focus:outline-none focus:border-green-700"
          />
          <button className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;