// src/features/auth/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Paleta de colores guía del blog:
// Fondo: from-[#5C2D0A] via-[#92400E] to-[#C2410C]
// Acents: #FED7AA (claro para resaltes), #F4C4A4, #B45309, #FFF7ED

export const Register = () => {
  const [formData, setFormData] = useState({
    document_number: '',
    name: '',
    paternal_lastname: '',
    maternal_lastname: '',
    email: '',
    phone: '',
    user_name: '',
    password: '',
    document_type_id: 1,
    country_id: 179
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
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
      const dataToSend = {
        ...formData,
        last_session: new Date().toISOString().split('T')[0],
        account_statement: true
      };

      await register(dataToSend);
      alert('¡Registro exitoso! Ahora puedes iniciar sesión');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5C2D0A] via-[#92400E] to-[#C2410C] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#FED7AA]/30 rounded-full blur-3xl -top-40 -left-40 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#F4C4A4]/30 rounded-full blur-3xl -bottom-48 -right-1/4 animate-pulse" style={{animationDelay: '0.7s'}}></div>
        <div className="absolute w-72 h-72 bg-[#B45309]/20 rounded-full blur-3xl top-1/3 right-1/4 animate-pulse" style={{animationDelay: '0.3s'}}></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-4xl border border-[#FED7AA]/30 animate-fadeIn">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FED7AA] via-[#F4C4A4] to-[#B45309] rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:rotate-12 hover:scale-110 transform">
            <svg className="w-8 h-8 text-[#92400E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-[#FFF7ED] mb-2 text-center">
          Crear Cuenta
        </h1>
        <p className="text-[#F4C4A4] text-center mb-8">Completa el formulario para registrarte</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="group animate-slideInLeft" style={{animationDelay: '0.1s'}}>
              <label className="block text-sm font-medium text-[#F4C4A4] mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#FED7AA] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/20 group-hover:border-[#B45309]/50"
                required
              />
            </div>

            {/* Usuario */}
            <div className="group animate-slideInRight" style={{animationDelay: '0.1s'}}>
              <label className="block text-sm font-medium text-[#F4C4A4] mb-2">Usuario</label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#FED7AA] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/20 group-hover:border-[#B45309]/50"
                required
              />
            </div>

            {/* Apellido Paterno */}
            <div className="group animate-slideInLeft" style={{animationDelay: '0.2s'}}>
              <label className="block text-sm font-medium text-[#F4C4A4] mb-2">Apellido Paterno</label>
              <input
                type="text"
                name="paternal_lastname"
                value={formData.paternal_lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#FED7AA] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/20 group-hover:border-[#B45309]/50"
                required
              />
            </div>

            {/* Apellido Materno */}
            <div className="group animate-slideInRight" style={{animationDelay: '0.2s'}}>
              <label className="block text-sm font-medium text-[#F4C4A4] mb-2">Apellido Materno</label>
              <input
                type="text"
                name="maternal_lastname"
                value={formData.maternal_lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#FED7AA] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/20 group-hover:border-[#B45309]/50"
                required
              />
            </div>

            {/* Email */}
            <div className="group animate-slideInLeft" style={{animationDelay: '0.3s'}}>
              <label className="block text-sm font-medium text-[#F4C4A4] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#FED7AA] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/20 group-hover:border-[#B45309]/50"
                required
              />
            </div>

            {/* Teléfono */}
            <div className="group animate-slideInRight" style={{animationDelay: '0.3s'}}>
              <label className="block text-sm font-medium text-[#F4C4A4] mb-2">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#FED7AA] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/20 group-hover:border-[#B45309]/50"
                required
              />
            </div>

            {/* N° Documento */}
            <div className="group animate-slideInLeft" style={{animationDelay: '0.4s'}}>
              <label className="block text-sm font-medium text-[#F4C4A4] mb-2">N° Documento</label>
              <input
                type="text"
                name="document_number"
                value={formData.document_number}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#FED7AA] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/20 group-hover:border-[#B45309]/50"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="group animate-slideInRight" style={{animationDelay: '0.4s'}}>
              <label className="block text-sm font-medium text-[#F4C4A4] mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#FED7AA] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#FED7AA]/20 group-hover:border-[#B45309]/50"
                required
                minLength={8}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FED7AA] via-[#F4C4A4] to-[#B45309] hover:from-[#F4C4A4] hover:via-[#B45309] hover:to-[#C2410C] text-[#92400E] font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group animate-fadeInUp"
            style={{animationDelay: '0.5s'}}
          >
            <span className="relative z-10">
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-[#92400E]" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </span>
              ) : (
                'Registrarse'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FED7AA] via-[#F4C4A4] to-[#B45309] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#F4C4A4] text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-[#FED7AA] hover:text-[#FFF7ED] font-medium transition-colors duration-300 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};