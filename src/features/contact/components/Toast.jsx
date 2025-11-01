import { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    const colors = {
        success: 'from-green-500 to-emerald-600',
        error: 'from-red-500 to-rose-600',
        warning: 'from-yellow-500 to-orange-600',
        info: 'from-blue-500 to-indigo-600'
    };

    return (
        <div className="fixed top-20 right-4 z-50 animate-slideInRight">
            <div className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl flex items-start max-w-md border-2 border-white/30`}>
                <span className="text-2xl mr-3">{icons[type]}</span>
                <div className="flex-1">
                    <p className="font-semibold">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="ml-4 text-white/80 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>

            <style jsx>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default Toast;