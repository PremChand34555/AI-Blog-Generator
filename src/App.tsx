import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogGenerator from './pages/BlogGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
