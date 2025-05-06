// import { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Home from "./pages/Home";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import UserProfile from "./pages/UserProfile";
// import Chat from "./pages/Chat";
// import AdminProducts from "./pages/admin/AdminProducts";
// import AdminUsers from "./pages/admin/AdminUsers";
// import AdminOrders from "./pages/admin/AdminOrders";
// import AdminChat from "./pages/admin/AdminChat";
// import Login from "./pages/admin/AdminLogin";
// import UserLogin from "./pages/UserLogin";

// function App() {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     setToken(user.token);
//   }, []);

//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-100">
//           <Routes>
//             {!token ? (
//               <>
//                 <Route
//                   path="/user-login"
//                   element={<UserLogin setToken={setToken} />}
//                 />
//                 <Route
//                   path="*"
//                   element={<Navigate to="/user-login" replace />}
//                 />
//               </>
//             ) : (
//               <>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/product/:id" element={<ProductDetail />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/checkout" element={<Checkout />} />
//                 <Route path="/profile" element={<UserProfile />} />
//                 <Route path="/chat" element={<Chat />} />
//                 <Route
//                   path="/user-login"
//                   element={<Navigate to="/" replace />}
//                 />

//                 {/* Admin routes */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/admin" element={<Navigate to="/login" />} />
//                 <Route path="/admin/products" element={<AdminProducts />} />
//                 <Route path="/admin/users" element={<AdminUsers />} />
//                 <Route path="/admin/orders" element={<AdminOrders />} />
//                 <Route path="/admin/chat" element={<AdminChat />} />
//               </>
//             )}
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

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
  const [auth, setAuth] = useState({ user: null, admin: null });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || null;
    const adminData = JSON.parse(localStorage.getItem("admin")) || null;
    setAuth({ user: userData, admin: adminData });
  }, []);

  const isUserLoggedIn = auth.user && auth.user.token && auth.user.role === "USER";
  const isAdminLoggedIn = auth.admin && auth.admin.token && auth.admin.role === "ADMIN";

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Tuyến đường cho người dùng chưa đăng nhập */}
            {!isUserLoggedIn && !isAdminLoggedIn && (
              <>
                <Route
                  path="/user-login"
                  element={<UserLogin setAuth={setAuth} />}
                />
                <Route
                  path="/admin/login"
                  element={<Login setAuth={setAuth} />}
                />
                {/* Chuyển hướng các tuyến đường admin đến /admin/login */}
                <Route
                  path="/admin/*"
                  element={<Navigate to="/admin/login" replace />}
                />
                {/* Chuyển hướng các tuyến đường khác đến /user-login */}
                <Route
                  path="*"
                  element={<Navigate to="/user-login" replace />}
                />
              </>
            )}

            {/* Tuyến đường cho người dùng đã đăng nhập (role: user) */}
            {isUserLoggedIn && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/chat" element={<Chat />} />
                <Route
                  path="/user-login"
                  element={<Navigate to="/" replace />}
                />
                {/* Ngăn người dùng truy cập tuyến đường admin */}
                <Route
                  path="/admin/*"
                  element={<Navigate to="/" replace />}
                />
              </>
            )}

            {/* Tuyến đường cho admin đã đăng nhập (role: admin) */}
            {isAdminLoggedIn && (
              <>
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/chat" element={<AdminChat />} />
                <Route
                  path="/admin/login"
                  element={<Navigate to="/admin/products" replace />}
                />
                {/* Chuyển hướng /admin đến /admin/products */}
                <Route
                  path="/admin"
                  element={<Navigate to="/admin/products" replace />}
                />
                {/* Ngăn admin truy cập tuyến đường người dùng */}
                <Route
                  path="*"
                  element={<Navigate to="/admin/products" replace />}
                />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;