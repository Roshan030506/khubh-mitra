import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { SplashLoader } from '../common/SplashLoader';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { user, role, status, loading } = useAuth();
  const { currentUser } = useApp();
  const hasSession = !!user || (import.meta.env.DEV && !!currentUser);
  const effectiveRole = role || currentUser?.role;
  const effectiveStatus = status || currentUser?.status;

  if (loading) {
    return <SplashLoader />;
  }

  // If already authenticated, redirect straight to role-specific dashboard
  if (hasSession) {
    if (effectiveRole === 'admin') {
      return <Navigate to="/admin/home" replace />;
    }
    if (effectiveRole === 'vendor') {
      if (effectiveStatus === 'pending_approval') {
        return <Navigate to="/vendor/pending" replace />;
      }
      return <Navigate to="/vendor/home" replace />;
    }
    // Default pilgrim
    return <Navigate to="/pilgrim/home" replace />;
  }

  return <>{children}</>;
};
