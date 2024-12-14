import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Importando axios para fazer as requisições

const LivrosMaisEmprestados = () => {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchLivrosMaisEmprestados = async () => {
      try {
        // Utilizando o IP diretamente, sem usar o arquivo de configuração
        const response = await axios.get('http://192.168.1.10:3000/api/emprestimos/livros-mais-emprestados');
        setLivros(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros mais emprestados:', error);
      }
    };

    fetchLivrosMaisEmprestados();
  }, []);

  return (
    <div>
      <h1>Livros Mais Emprestados</h1>
      <ul>
        {livros.map((livro, index) => (
          <li key={index}>
            <strong>{livro.livro?.titulo}</strong> - {livro.total} empréstimos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LivrosMaisEmprestados;
