import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Livros.css';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    ano: '',
  });

  const [editandoLivro, setEditandoLivro] = useState(null);

  // Função para buscar todos os livros
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://192.168.1.10:3000/api/livros');  // Substitua o IP se necessário
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  // Função para cadastrar um novo livro
  const cadastrarLivro = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.1.10:3000/api/livros', novoLivro);  // Substitua o IP se necessário
      setNovoLivro({ titulo: '', autor: '', genero: '', ano: '' });
      fetchLivros(); // Atualizar a lista
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
    }
  };

  // Função para excluir um livro
  const excluirLivro = async (id) => {
    try {
      await axios.delete(`http://192.168.1.10:3000/api/livros/${id}`);  // Substitua o IP se necessário
      fetchLivros(); // Atualizar a lista
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  // Função para iniciar a edição de um livro
  const iniciarEdicao = (livro) => {
    setEditandoLivro(livro);
  };

  // Função para salvar alterações no livro
  const salvarEdicao = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.1.10:3000/api/livros/${editandoLivro._id}`, editandoLivro);  // Substitua o IP se necessário
      setEditandoLivro(null); // Limpar estado de edição
      fetchLivros(); // Atualizar a lista
    } catch (error) {
      console.error('Erro ao editar livro:', error);
    }
  };

  // Carregar os livros ao montar o componente
  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <div className="livros-container">
      <h1>Gerenciamento de Livros</h1>

      {/* Formulário para cadastrar novo livro */}
      <form onSubmit={cadastrarLivro} className="livros-form">
        <h2>Cadastrar Novo Livro</h2>
        <input
          type="text"
          placeholder="Título"
          value={novoLivro.titulo}
          onChange={(e) => setNovoLivro({ ...novoLivro, titulo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={novoLivro.autor}
          onChange={(e) => setNovoLivro({ ...novoLivro, autor: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Gênero"
          value={novoLivro.genero}
          onChange={(e) => setNovoLivro({ ...novoLivro, genero: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Ano de Publicação"
          value={novoLivro.ano}
          onChange={(e) => setNovoLivro({ ...novoLivro, ano: e.target.value })}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      {/* Lista de livros */}
      <h2>Lista de Livros</h2>
      <ul className="livros-lista">
        {livros.map((livro) => (
          <li key={livro._id}>
            {editandoLivro && editandoLivro._id === livro._id ? (
              // Formulário de edição
              <form onSubmit={salvarEdicao}>
                <input
                  type="text"
                  value={editandoLivro.titulo}
                  onChange={(e) => setEditandoLivro({ ...editandoLivro, titulo: e.target.value })}
                />
                <input
                  type="text"
                  value={editandoLivro.autor}
                  onChange={(e) => setEditandoLivro({ ...editandoLivro, autor: e.target.value })}
                />
                <input
                  type="text"
                  value={editandoLivro.genero}
                  onChange={(e) => setEditandoLivro({ ...editandoLivro, genero: e.target.value })}
                />
                <input
                  type="number"
                  value={editandoLivro.ano}
                  onChange={(e) => setEditandoLivro({ ...editandoLivro, ano: e.target.value })}
                />
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setEditandoLivro(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <span>
                  <strong>ID:</strong> {livro._id} - <strong>Título:</strong> {livro.titulo} - <strong>Autor:</strong> {livro.autor}
                </span>
                <button onClick={() => iniciarEdicao(livro)}>Editar</button>
                <button onClick={() => excluirLivro(livro._id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Livros;
