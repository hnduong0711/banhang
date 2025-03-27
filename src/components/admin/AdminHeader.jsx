import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-900 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <NavLink to="/admin/products" className="text-2xl font-bold drop-shadow-md">
          Admin Dashboard
        </NavLink>
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-6">
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-300 font-semibold'
                  : 'hover:text-green-300 transition duration-300'
              }
            >
              Quản lý sản phẩm
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-300 font-semibold'
                  : 'hover:text-green-300 transition duration-300'
              }
            >
              Quản lý user
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-300 font-semibold'
                  : 'hover:text-green-300 transition duration-300'
              }
            >
              Quản lý hóa đơn
            </NavLink>
            <NavLink
              to="/admin/chat"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-300 font-semibold'
                  : 'hover:text-green-300 transition duration-300'
              }
            >
              Chat với user
            </NavLink>
          </nav>
          <button
            onClick={handleLogout}
            className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-full transition duration-300"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;