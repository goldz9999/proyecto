// src/features/blog/pages/Posts.jsx
import { useEffect, useState } from 'react';
import { getPosts } from '../api/blogApi';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';
import { useAuth } from '../../auth/hooks/useAuth';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPosts(20);
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Nueva paleta: tonos oscuros y acentos cálidos para mejor contraste.
  // Fondo base: from-[#5C2D0A] via-[#92400E] to-[#C2410C]
  // Acents: #FED7AA (claro para chips), #F4C4A4, #B45309, #FFF7ED para efectos y detalles menores.

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#5C2D0A] via-[#92400E] to-[#C2410C]">
        <Loader message="Cargando posts del blog..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#5C2D0A] via-[#92400E] to-[#C2410C]">
        <ErrorMsg message={error} onRetry={fetchPosts} />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#5C2D0A] via-[#92400E] to-[#C2410C] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#B45309]/30 rounded-full blur-3xl -top-24 -left-24 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-[#6B7280]/20 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse" style={{animationDelay: '0.6s'}}></div>
        <div className="absolute w-64 h-32 bg-[#C2410C]/30 blur-2xl rounded-full top-1/3 left-1/2 transform -translate-x-1/2 animate-pulse" style={{animationDelay: '0.3s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-[#292524]/95 backdrop-blur-sm border-b border-[#B45309]/30 shadow-2xl animate-fadeIn rounded-b-3xl overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="animate-slideInLeft">
                <h1 className="text-4xl font-extrabold mb-2 flex items-center text-[#FED7AA] font-poppins tracking-tight">
                  <span className="mr-3 text-5xl animate-bounce">📝</span>
                  Blog de Posts
                </h1>
                <p className="text-[#F4C4A4]">
                  Bienvenido,{' '}
                  <span className="font-semibold text-[#FED7AA]">{user?.name}</span>
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right animate-slideInRight">
                <p className="text-sm text-[#B45309]">Total de posts</p>
                <p className="text-4xl font-extrabold bg-gradient-to-r from-[#FED7AA] via-[#F4C4A4] to-[#B45309] bg-clip-text text-transparent font-poppins">
                  {posts.length}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative group animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <input
                type="text"
                placeholder="🔍 Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-[#292524]/80 border border-[#B45309]/40 rounded-2xl focus:ring-2 focus:ring-[#FED7AA] focus:border-transparent outline-none text-[#FED7AA] placeholder-[#B45309] backdrop-blur-md transition-all duration-300 group-hover:bg-[#5C2D0A]/70 font-poppins font-medium text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-[#B45309] group-hover:text-[#FED7AA] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 animate-fadeIn">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-[#F4C4A4] text-xl">
                No se encontraron posts con "<span className="text-[#FED7AA] font-medium">{searchTerm}</span>"
              </p>
            </div>
          ) : (
            <>
              <p className="text-[#F4C4A4] mb-6 animate-fadeIn">
                Mostrando{' '}
                <span className="text-[#FED7AA] font-bold">{filteredPosts.length}</span> de{' '}
                <span className="text-[#B45309] font-bold">{posts.length}</span> posts
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-scaleIn"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </>
          )}
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
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.25, 1, 0.5, 1); }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.6s cubic-bezier(0.25, 1, 0.5, 1); }
        .animate-slideInRight { animation: slideInRight 0.6s cubic-bezier(0.25, 1, 0.5, 1); }
        .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      `}</style>
    </div>
  );
};

export default Posts;