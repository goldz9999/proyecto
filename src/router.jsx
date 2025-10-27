// src/router.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './features/auth/pages/Login';
import { Register } from './features/auth/pages/Register';
import { Profile } from './features/profile/pages/Profile';
import Posts from './features/blog/pages/Posts';
import PostDetail from './features/blog/pages/PostDetail';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas con Layout */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="blog" element={<Posts />} />
          <Route path="blog/:id" element={<PostDetail />} />
        </Route>

        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};