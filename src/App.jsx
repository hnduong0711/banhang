import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UserProfile from "./pages/UserProfile";
import Chat from "./pages/Chat";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminChat from "./pages/admin/AdminChat";
import Login from "./pages/admin/AdminLogin";
import UserLogin from "./pages/UserLogin";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setToken(user.token);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {!token ? (
              <>
                <Route
                  path="/user-login"
                  element={<UserLogin setToken={setToken} />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/user-login" replace />}
                />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/chat" element={<Chat />} />
                <Route
                  path="/user-login"
                  element={<Navigate to="/" replace />}
                />

                {/* Admin routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Navigate to="/login" />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/chat" element={<AdminChat />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
