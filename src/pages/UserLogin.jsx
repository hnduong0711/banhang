import axios from "axios";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   dùng axios gọi api đăng nhập và lưu vào localStorage
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5155/api/Auth/login",
        { email, password }
      );

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setToken(response.data.token); // 
        navigate("/"); // 
      } else {
        alert("Sai thông tin đăng nhập!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Đã xảy ra lỗi khi đăng nhập!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-800 drop-shadow-md">
          Đăng nhập
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-green-700 font-semibold mb-2"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="email"
              placeholder="Nhập tên đăng nhập"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-green-700 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-green-700 font-semibold mb-2"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-green-500 rounded-lg focus:outline-none focus:border-green-700 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-900 transition duration-300 shadow-md"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Chưa có tài khoản?{" "}
          <a href="#" className="text-green-700 hover:underline">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
