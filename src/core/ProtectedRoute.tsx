import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute: React.FC<{ allowedRoles?: string[] }> = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user) {
    if (location.pathname.startsWith("/admin")) return <Navigate to="/admin/login" state={{ from: location }} replace />;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-500">403</h1>
            <p>Access Denied: Insufficient Permissions</p>
        </div>
    </div>;
  }

  return <Outlet />;
};
