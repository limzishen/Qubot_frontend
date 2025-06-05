import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Template from './pages/Template';
import Login from './pages/Login';
import Register from './pages/Register';
import Llm from './pages/Llm'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from './Theme';

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Routes>
      
       <Route path="/" element={<Home />} />
       <Route path="/template" element={<Template />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/llm" element={<Llm />} />
    </Routes>
    </ThemeProvider>
    </>
  );
}

export default App;
