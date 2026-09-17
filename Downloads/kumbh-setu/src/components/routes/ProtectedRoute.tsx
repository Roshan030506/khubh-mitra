import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { UserRole, UserApprovalStatus } from '../../types';
import { SplashLoader } from '../common/SplashLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: UserRole;
  requiredStatus?: UserApprovalStatus;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  role: expectedRole,
  requiredStatus
}) => {
  const { user, role: userRole, status: userStatus, loading } = useAuth();
  const { currentUser } = useApp();
  const location = useLocation();
  const hasSession = !!user || (import.meta.env.DEV && !!currentUser);
  const effectiveRole = userRole || currentUser?.role || null;
  const effectiveStatus = userStatus || currentUser?.status || null;

  if (loading) {
    return <SplashLoader />;
  }

  // 1. Not authenticated -> Redirect to /login
  if (!hasSession) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Role mismatch -> Redirect to user's authorized role dashboard
  if (effectiveRole !== expectedRole) {
    if (effectiveRole === 'admin') {
      return <Navigate to="/admin/home" replace />;
    }
    if (effectiveRole === 'vendor') {
      if (effectiveStatus === 'pending_approval') {
        return <Navigate to="/vendor/pending" replace />;
      }
      return <Navigate to="/vendor/home" replace />;
    }
    return <Navigate to="/pilgrim/home" replace />;
  }

  // 3. Vendor status check: if vendor is pending approval and tries to visit /vendor (main dashboard),
  // redirect to /vendor/pending. If vendor is approved and visits /vendor/pending, redirect to /vendor.
  if (expectedRole === 'vendor') {
    if (requiredStatus === 'approved' && effectiveStatus === 'pending_approval') {
      return <Navigate to="/vendor/pending" replace />;
    }
    if (requiredStatus === 'pending_approval' && effectiveStatus === 'approved') {
      return <Navigate to="/vendor/home" replace />;
    }
  }

  return <>{children}</>;
};
