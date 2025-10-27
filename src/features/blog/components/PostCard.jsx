// src/features/blog/components/PostCard.jsx
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`}>
      <div className="group relative bg-[#FFF7ED]/80 backdrop-blur-xl border border-[#FED7AA]/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 h-full cursor-pointer overflow-hidden transform hover:scale-105 hover:-translate-y-2">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4C4A4]/0 via-[#92400E]/0 to-[#B45309]/0 group-hover:from-[#F4C4A4]/10 group-hover:via-[#C2410C]/10 group-hover:to-[#B45309]/10 transition-all duration-500 rounded-2xl"></div>
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FED7AA] to-[#C2410C] rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#B45309] bg-[#FED7AA]/80 px-3 py-1.5 rounded-full border border-[#F4C4A4]/40 group-hover:scale-110 transition-transform duration-300">
              Post #{post.id}
            </span>
            <span className="text-xs text-[#B45309]/70 group-hover:text-[#C2410C] transition-colors duration-300">
              👤 Usuario {post.userId}
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-xl font-bold text-[#5C2D0A] mb-3 line-clamp-2 capitalize group-hover:text-[#C2410C] transition-colors duration-300 font-poppins">
            {post.title}
          </h2>
          
          {/* Body */}
          <p className="text-[#92400E]/80 text-sm line-clamp-3 mb-4 group-hover:text-[#92400E] transition-colors duration-300">
            {post.body}
          </p>
          
          {/* Footer with arrow */}
          <div className="flex items-center justify-between pt-4 border-t border-[#FED7AA]/40">
            <span className="text-[#B45309] text-sm font-medium group-hover:text-[#C2410C] transition-colors duration-300 flex items-center">
              Leer más
              <svg 
                className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            
            {/* Reading time estimate */}
            <div className="flex items-center text-xs text-[#92400E]/70 group-hover:text-[#C2410C]/80 transition-colors duration-300">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              2 min
            </div>
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F4C4A4]/25 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Link>
  );
};

export default PostCard;