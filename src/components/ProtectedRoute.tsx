// src/components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupabaseSession } from '../supabaseClient'; // Adjust path as needed

interface ProtectedRouteProps {
  children: React.ReactNode;
  session: SupabaseSession | null;
  loading: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, session, loading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // If loading, do nothing yet; wait for session status to be determined
    if (loading) {
      return;
    }

    // If not loading and no session, redirect to the login page
    if (!session) {
      navigate('/login', { replace: true }); // Use replace to prevent back button issues
    }
  }, [session, loading, navigate]); // Re-run effect if session, loading, or navigate changes

  // During loading or if not authenticated yet, show a placeholder
  if (loading || !session) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '20px'
      }}>
        Loading content...
      </div>
    );
  }

  // If authenticated and not loading, render the children
  return <>{children}</>;
};

export default ProtectedRoute;