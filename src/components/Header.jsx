import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const navigate = useNavigate(); // Điều hướng quay lại

  // Nút Back chỉ hiển thị khi không ở trang Home
  const showBackButton = location.pathname !== '/';

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
            Cửa Hàng Xanh
          </NavLink>
        </div>
        <nav className="flex space-x-6">
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
        </nav>
      </div>
    </header>
  );
}

export default Header;