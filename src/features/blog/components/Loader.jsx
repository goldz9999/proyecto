// src/features/blog/components/Loader.jsx
const Loader = ({ message = 'Cargando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
      {/* Animated circles */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
        <div className="absolute inset-4 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{animationDuration: '0.75s'}}></div>
      </div>

      {/* Message */}
      <p className="text-gray-300 text-xl font-medium animate-pulse">{message}</p>
      
      {/* Loading dots */}
      <div className="flex space-x-2 mt-4">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
};

export default Loader;