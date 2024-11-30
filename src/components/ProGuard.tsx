import React from 'react';
import { Navigate } from 'react-router-dom';
import { useProStatus } from '../hooks/useProStatus';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProGuardProps {
  children: React.ReactNode;
}

export const ProGuard: React.FC<ProGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const { isPro, isLoading, error } = useProStatus(user);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!isPro) {
    return <Navigate to="/pro" replace />;
  }

  return <>{children}</>;
};