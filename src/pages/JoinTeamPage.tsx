import React from 'react';
import { Navigate } from 'react-router-dom';
import { JoinTeamForm } from '../components/JoinTeamForm';
import { useAuth } from '../hooks/useAuth';

export const JoinTeamPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <JoinTeamForm />
    </div>
  );
}; 