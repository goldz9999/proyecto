// src/features/blog/components/ErrorMsg.jsx
const ErrorMsg = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
      <div className="bg-red-500/10 backdrop-blur-xl border-2 border-red-500/30 rounded-3xl p-10 max-w-md text-center relative overflow-hidden group">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          {/* Icon with animation */}
          <div className="relative mx-auto w-20 h-20 mb-6">
            <svg 
              className="w-20 h-20 text-red-400 animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          <h3 className="text-2xl font-bold text-red-400 mb-3">
            ¡Oops! Algo salió mal
          </h3>
          
          <p className="mb-8 leading-relaxed text-base font-semibold text-red-700 drop-shadow" style={{ wordBreak: 'break-word' }}>
            {message || 'Error al cargar los datos'}
          </p>
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="group relative bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center mx-auto"
            >
              <svg 
                className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Intentar de nuevo
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ErrorMsg;