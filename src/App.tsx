import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Template from './pages/Template.tsx';

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/template" element={<Template />} />
    </Routes>
    </>
  );
}

export default App;
