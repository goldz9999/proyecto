// src/features/profile/pages/Profile.jsx
import { useAuth } from '../../auth/hooks/useAuth';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-8 text-center text-[#5C2D0A]">Cargando perfil...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF7ED] via-[#F4C4A4] to-[#92400E] py-12 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#B45309]/20 rounded-full blur-3xl -top-24 -left-24 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-[#6B7280]/15 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute w-64 h-32 bg-[#C2410C]/15 blur-2xl rounded-full top-1/3 left-1/2 transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[#B45309]/30 animate-fadeIn">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-[#92400E] via-[#C2410C] to-[#B45309] p-10">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold text-[#FFF7ED] mb-2 animate-slideInDown font-poppins tracking-tight">Tu Perfil</h1>
              <p className="text-[#FED7AA] text-base animate-slideInDown" style={{ animationDelay: '0.2s' }}>
                Gestiona tus datos personales
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* User Avatar and Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 animate-fadeInUp">
              <div className="relative group">
                <div className="w-28 h-28 bg-gradient-to-br from-[#C2410C] via-[#B45309] to-[#92400E] rounded-full flex items-center justify-center text-white text-4xl font-extrabold shadow-lg group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 border-4 border-[#FFF7ED]/60">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#B45309]/30 to-[#6B7280]/20 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-[#5C2D0A] mb-1 font-poppins">{user.name}</h2>
                <p className="text-[#B45309] text-base mb-2">@{user.user_name}</p>
                {user.role && (
                  <span className="inline-block px-4 py-1 bg-[#6B7280]/20 text-[#5C2D0A] rounded-full text-xs font-semibold shadow-sm border border-[#B45309]/30 transition-transform duration-300 hover:scale-105">
                    {user.role.name}
                  </span>
                )}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Email Card */}
              <div className="group bg-gradient-to-br from-[#FFF7ED] via-[#F4C4A4]/50 to-[#B45309]/20 rounded-xl p-6 border border-[#B45309]/20 hover:border-[#C2410C] transition-all duration-300 transform hover:scale-102 hover:shadow-md animate-slideInLeft">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C2410C] to-[#B45309] rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300 shadow">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-[#92400E]">Correo Electrónico</h3>
                </div>
                <p className="text-base font-semibold text-[#5C2D0A]">{user.email}</p>
              </div>

              {/* Phone Card */}
              <div className="group bg-gradient-to-br from-[#FFF7ED] via-[#F4C4A4]/50 to-[#B45309]/20 rounded-xl p-6 border border-[#B45309]/20 hover:border-[#C2410C] transition-all duration-300 transform hover:scale-102 hover:shadow-md animate-slideInUp">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C2410C] to-[#B45309] rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300 shadow">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-[#92400E]">Teléfono</h3>
                </div>
                <p className="text-base font-semibold text-[#5C2D0A]">{user.phone}</p>
              </div>

              {/* Country Card */}
              {user.country && (
                <div className="group bg-gradient-to-br from-[#FFF7ED] via-[#F4C4A4]/50 to-[#B45309]/20 rounded-xl p-6 border border-[#B45309]/20 hover:border-[#C2410C] transition-all duration-300 transform hover:scale-102 hover:shadow-md animate-slideInRight">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#C2410C] to-[#B45309] rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300 shadow">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-[#92400E]">País</h3>
                  </div>
                  <p className="text-base font-semibold text-[#5C2D0A]">{user.country.name}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[#F4C4A4]/40 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-base font-semibold text-[#5C2D0A] mb-3">Acciones</h3>
              <div className="flex flex-wrap gap-4">
                <button className="group flex items-center px-5 py-2 bg-gradient-to-r from-[#C2410C] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white font-medium rounded-lg shadow-sm border border-[#F4C4A4]/40 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <svg className="w-5 h-5 mr-2 text-[#FFF7ED] group-hover:scale-105 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Perfil
                </button>
                <button className="group flex items-center px-5 py-2 bg-[#FFF7ED]/90 hover:bg-[#FFF7ED] text-[#92400E] font-medium rounded-lg border border-[#B45309]/30 hover:border-[#C2410C] shadow-sm transition-all duration-300 transform hover:scale-105">
                  <svg className="w-5 h-5 mr-2 text-[#B45309] group-hover:scale-105 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.25, 1, 0.5, 1); }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-slideInDown { animation: slideInDown 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-slideInRight { animation: slideInRight 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      `}</style>
    </div>
  );
};