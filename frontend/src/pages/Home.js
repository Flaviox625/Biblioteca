import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Importe o CSS da página Home

const Home = () => {
  return (
    <div className="home-container">
      <h1>Sistema de Gerenciamento de Biblioteca</h1>
      <div className="home-nav">
        <ul>
          <li><Link to="/livros">Gerenciar Livros</Link></li>
          <li><Link to="/usuarios">Gerenciar Usuários</Link></li>
          <li><Link to="/emprestimos">Gerenciar Empréstimos</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
