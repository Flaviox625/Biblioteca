import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Livros from './pages/Livros';
import Usuarios from './pages/Usuarios';
import Emprestimos from './pages/Emprestimos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/emprestimos" element={<Emprestimos />} />
      </Routes>
    </Router>
  );
}

export default App;
