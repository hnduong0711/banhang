import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Hàm xử lý đăng nhập

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "" && password === "") {
      login();
      navigate("/admin/products");
    } else {
      alert("Sai thông tin đăng nhập!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-green-800 text-center">
          Đăng nhập Admin
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border-2 border-green-500 rounded focus:outline-none focus:border-green-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border-2 border-green-500 rounded focus:outline-none focus:border-green-700"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
