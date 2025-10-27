// src/features/blog/pages/PostDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, getPostComments } from '../api/blogApi';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';


const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadTime, setLoadTime] = useState(0);

  const fetchPostData = async () => {
    const startTime = Date.now();
    setLoading(true);
    setError(null);

    try {
      const [postData, commentsData] = await Promise.all([
        getPostById(id),
        getPostComments(id)
      ]);
      setPost(postData);
      setComments(commentsData);
      setLoadTime(Date.now() - startTime);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF7ED] via-[#F4C4A4] to-[#92400E]">
        <Loader message="Cargando post..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF7ED] via-[#F4C4A4] to-[#92400E]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/blog')}
            className="mb-4 flex items-center text-[#B45309] hover:text-[#C2410C] font-medium transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al blog
          </button>
          <ErrorMsg message={error} onRetry={fetchPostData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#FFF7ED] via-[#F4C4A4] to-[#92400E] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#B45309]/20 rounded-full blur-3xl -top-24 -left-24 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-[#6B7280]/15 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute w-64 h-32 bg-[#C2410C]/15 blur-2xl rounded-full top-1/3 left-1/2 transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="mb-6 flex items-center px-4 py-2 bg-[#FFF7ED]/90 hover:bg-[#F4C4A4]/90 text-[#92400E] font-medium rounded-xl border border-[#B45309]/30 hover:border-[#C2410C] shadow-sm group animate-slideInLeft transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2 text-[#C2410C] group-hover:scale-105 transform group-hover:-translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al blog
        </button>

        {/* Post Content */}
        <article className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[#B45309]/30 animate-fadeInUp">
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-[#92400E] via-[#C2410C] to-[#B45309] px-8 py-10 overflow-hidden">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-40 h-40 bg-[#FFF7ED]/60 rounded-full -top-10 -right-10 animate-pulse"></div>
              <div className="absolute w-32 h-32 bg-[#FFF7ED]/50 rounded-full -bottom-10 -left-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#FED7AA] text-sm font-medium bg-[#FFF7ED]/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  Post #{post.id}
                </span>
                <span className="text-[#FED7AA] text-sm bg-[#FFF7ED]/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  👤 Usuario {post.userId}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-[#FFF7ED] capitalize leading-tight font-poppins animate-slideInDown tracking-tight">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-[#5C2D0A] text-lg leading-relaxed">
                {post.body}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-[#FED7AA]/40 flex flex-wrap gap-6">
              <div className="flex items-center text-[#B45309] bg-[#FFF7ED]/60 px-4 py-2 rounded-xl backdrop-blur-[2px] group hover:bg-[#FFF7ED] transition-all duration-300 shadow-sm border border-[#B45309]/20">
                <svg className="w-5 h-5 mr-2 text-[#B45309] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tiempo de carga: <strong className="text-[#92400E] ml-1">{loadTime}ms</strong></span>
              </div>
              <div className="flex items-center text-[#C2410C] bg-[#F4C4A4]/50 px-4 py-2 rounded-xl backdrop-blur-[2px] group hover:bg-[#F4C4A4]/90 transition-all duration-300 shadow-sm border border-[#C2410C]/20">
                <svg className="w-5 h-5 mr-2 text-[#C2410C] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span><strong className="text-[#5C2D0A] mr-1">{comments.length}</strong> comentarios</span>
              </div>
              <div className="flex items-center text-[#92400E] bg-[#FED7AA]/60 px-4 py-2 rounded-xl backdrop-blur-[2px] group hover:bg-[#FFF7ED]/80 transition-all duration-300 shadow-sm border border-[#92400E]/20">
                <svg className="w-5 h-5 mr-2 text-[#92400E] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span><strong className="text-[#92400E] mr-1">1.2k</strong> vistas</span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="px-8 pb-8">
            <div className="flex items-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FED7AA]/40 to-transparent"></div>
              <h2 className="text-2xl font-bold text-[#5C2D0A] mx-4 flex items-center font-poppins">
                <span className="mr-2">💬</span>
                Comentarios ({comments.length})
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FED7AA]/40 to-transparent"></div>
            </div>
            
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div 
                  key={comment.id} 
                  className="group bg-[#FFF7ED]/90 backdrop-blur-md rounded-2xl p-6 border border-[#B45309]/15 hover:border-[#C2410C]/30 hover:bg-[#FED7AA]/70 transition-all duration-300 animate-slideInUp"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#C2410C] to-[#B45309] rounded-full flex items-center justify-center text-white font-extrabold mr-3 group-hover:scale-110 transition-transform duration-300 text-lg">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#92400E] group-hover:text-[#C2410C] transition-colors duration-300 font-poppins">
                          {comment.name}
                        </h3>
                        <p className="text-sm text-[#B45309]">{comment.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#F4C4A4] bg-[#92400E]/10 px-2 py-1 rounded-full">
                      #{comment.id}
                    </span>
                  </div>
                  <p className="text-[#5C2D0A] leading-relaxed">{comment.body}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-slideInUp { animation: slideInUp 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-slideInDown { animation: slideInDown 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      `}</style>
    </div>
  );
};

export default PostDetail;