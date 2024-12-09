import React from 'react';
import { Navigate } from 'react-router-dom';
import { AddTeamForm } from '../components/AddTeamForm';
import { useAuth } from '../hooks/useAuth';

export const SignupPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <AddTeamForm divisionId={1} />
    </div>
  );
};