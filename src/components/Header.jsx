import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const navigate = useNavigate(); // Điều hướng quay lại
  const {user, token} = JSON.parse(localStorage.getItem("user")); // Kiểm tra token trong localStorage

  // Nút Back chỉ hiển thị khi không ở trang Home
  const showBackButton = location.pathname !== '/';

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token
    localStorage.removeItem('user'); // Xóa thông tin user nếu có
    navigate('/user-login'); // Chuyển hướng về trang đăng nhập
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-900 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)} // Quay lại trang trước
              className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-full transition duration-300"
            >
              Back
            </button>
          )}
          <NavLink to="/" className="text-2xl font-bold drop-shadow-md">
            23 Store
          </NavLink>
        </div>
        <nav className="flex space-x-6 items-center">
          {/* Luôn hiển thị tab Sản phẩm */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-green-300 font-semibold'
                : 'hover:text-green-300 transition duration-300'
            }
          >
            Sản phẩm
          </NavLink>

          {/* Hiển thị các tab khác chỉ khi có token */}
          {token && (
            <>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-300 font-semibold'
                    : 'hover:text-green-300 transition duration-300'
                }
              >
                Giỏ hàng
              </NavLink>
              <NavLink
                to="/checkout"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-300 font-semibold'
                    : 'hover:text-green-300 transition duration-300'
                }
              >
                Thanh toán
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-300 font-semibold'
                    : 'hover:text-green-300 transition duration-300'
                }
              >
                Tài khoản
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-300 font-semibold'
                    : 'hover:text-green-300 transition duration-300'
                }
              >
                Chat
              </NavLink>
            </>
          )}

          {/* Hiển thị nút Đăng nhập hoặc Đăng xuất dựa trên token */}
          {token ? (
            <button
              onClick={handleLogout}
              className="border-2 border-slate-300 hover:bg-slate-300 text-white hover:text-black px-3 py-1 rounded-full transition duration-300"
            >
              Đăng xuất
            </button>
          ) : (
            <NavLink
              to="/user-login"
              className="border-2 border-slate-300 hover:bg-slate-300 text-white hover:text-black px-3 py-1 rounded-full transition duration-300"
            >
              Đăng nhập
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;