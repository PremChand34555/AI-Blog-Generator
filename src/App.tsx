import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogGenerator from './pages/BlogGenerator';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BlogGenerator />} />
    </Routes>
  );
}

export default App;
