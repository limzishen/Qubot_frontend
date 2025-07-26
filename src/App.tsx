import React, { useState , useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Template from './pages/Template';
import Login from './pages/Login';
import Register from './pages/Register';
import Llm from './pages/Llm'
import Navigate from './pages/Mainpage'
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';
import { supabase, SupabaseSession } from './supabaseClient'; // Import supabase client and session type
import ProtectedRoute from './components/ProtectedRoute';
import Mainpage from './pages/Mainpage';

function App() {
    const [session, setSession] = useState<SupabaseSession | null>(null);
    const [loading, setLoading] = useState(true); // Initial loading state
    const navigate = useNavigate(); // Get navigate function
      useEffect(() => {
    // 1. Initial Session Check:
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setLoading(false); // Done with initial session check
    });
    const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession);
        setLoading(false); 
        // You can add logic here to redirect on SIGNED_OUT, etc.
        if (_event === 'SIGNED_OUT') {
          navigate('/login', { replace: true });
        }
      });

      return () => subscription.unsubscribe();
    }, [navigate]);

    if (loading) {
      return (
        <ThemeProvider theme={theme}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontSize: '24px'
          }}>
            Loading application...
          </div>
        </ThemeProvider>
      );
    }

  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login session={session}/>} />
        <Route path="/register" element={<Register session={session}/>} />
        {/* Protected Routes - Wrap them with ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Template /> {/* Pass session to children if they need it */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/llm"
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Llm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/navigate"
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Mainpage/> {/* Pass session to children if they need it */}
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </ThemeProvider>
    </>
  );
}

export default App;
