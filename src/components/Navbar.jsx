// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-gradient-to-r from-[#FFF7ED] via-[#F4C4A4] to-[#92400E] border-b border-[#B45309]/30 backdrop-blur-xl sticky top-0 z-50 shadow-2xl animate-slideDown">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/profile" className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C2410C] via-[#B45309] to-[#92400E] rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="ml-3 font-extrabold text-xl text-[#6B7280] group-hover:text-[#C2410C] transition-colors duration-300 font-poppins">
              Mi App
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              to="/profile"
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${isActive('/profile')
                  ? 'bg-gradient-to-r from-[#C2410C] via-[#B45309] to-[#92400E] text-[#FFF7ED] shadow-lg'
                  : 'text-[#92400E] hover:bg-[#F4C4A4]/50 hover:text-[#C2410C]'
                }`}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#B45309]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mi Perfil
              </span>
            </Link>

            <Link
              to="/blog"
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${isActive('/blog')
                  ? 'bg-gradient-to-r from-[#C2410C] via-[#B45309] to-[#92400E] text-[#FFF7ED] shadow-lg'
                  : 'text-[#92400E] hover:bg-[#F4C4A4]/50 hover:text-[#C2410C]'
                }`}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#B45309]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Blog
              </span>
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${isActive('/contact')
                  ? 'bg-gradient-to-r from-[#C2410C] via-[#B45309] to-[#92400E] text-[#FFF7ED] shadow-lg'
                  : 'text-[#92400E] hover:bg-[#F4C4A4]/50 hover:text-[#C2410C]'
                }`}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#B45309]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contacto
              </span>
            </Link>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-[#B45309]/20">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#5C2D0A] font-poppins">{user?.name}</p>
                <p className="text-xs text-[#B45309]">@{user?.user_name}</p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-[#C2410C] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-[#FFF7ED] px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center border border-[#F4C4A4]/40"
              >
                <svg className="w-5 h-5 mr-1 text-[#FFF7ED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;