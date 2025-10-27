// src/features/auth/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  // Colores guía del blog:
  // Fondo: from-[#5C2D0A] via-[#92400E] to-[#C2410C]
  // Acents: #FED7AA (claro para resaltes), #F4C4A4, #B45309, #FFF7ED

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5C2D0A] via-[#92400E] to-[#C2410C] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#FED7AA]/30 rounded-full blur-3xl -top-28 -left-28 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#FFF7ED]/20 rounded-full blur-3xl bottom-0 -right-40 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute w-64 h-64 bg-[#F4C4A4]/20 rounded-full blur-2xl top-1/3 left-1/2 transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      </div>

      <div className="relative z-10 bg-[#292524]/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-[#B45309]/30">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FED7AA] via-[#F4C4A4] to-[#B45309] rounded-2xl flex items-center justify-center shadow-lg hover:rotate-6 transition-transform duration-300">
            <svg className="w-10 h-10 text-[#92400E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FED7AA] via-[#F4C4A4] to-[#B45309] mb-2">
          Bienvenido
        </h1>
        <p className="text-[#F4C4A4] text-center mb-8">Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-medium text-[#F4C4A4] mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FFF7ED]/10 border border-[#FED7AA]/15 rounded-xl focus:ring-2 focus:ring-[#FED7AA] focus:border-transparent outline-none text-[#FED7AA] placeholder-[#B45309] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/15 font-medium"
                placeholder="tu@email.com"
                required
                autoComplete="username"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FED7AA]/0 via-[#F4C4A4]/0 to-[#FFF7ED]/0 group-hover:from-[#FED7AA]/10 group-hover:via-[#F4C4A4]/10 group-hover:to-[#FFF7ED]/10 transition-all duration-300 pointer-events-none"></div>
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-[#F4C4A4] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FFF7ED]/10 border border-[#FED7AA]/15 rounded-xl focus:ring-2 focus:ring-[#FED7AA] focus:border-transparent outline-none text-[#FED7AA] placeholder-[#B45309] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/15 font-medium"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FED7AA]/0 via-[#F4C4A4]/0 to-[#FFF7ED]/0 group-hover:from-[#FED7AA]/10 group-hover:via-[#F4C4A4]/10 group-hover:to-[#FFF7ED]/10 transition-all duration-300 pointer-events-none"></div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-[#FED7AA] px-4 py-3 rounded-xl text-sm backdrop-blur-sm animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FED7AA] via-[#F4C4A4] to-[#B45309] hover:from-[#F4C4A4] hover:via-[#B45309] hover:to-[#C2410C] text-[#92400E] font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group shadow-lg"
          >
            <span className="relative z-10">
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-[#92400E]" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FED7AA] via-[#F4C4A4] to-[#B45309] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#F4C4A4] text-sm">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-[#FED7AA] hover:text-[#FFF7ED] font-medium transition-colors duration-300 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};