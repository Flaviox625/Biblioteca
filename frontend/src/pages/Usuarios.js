import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    endereco: '',
    email: '',
    telefone: '',
  });

  const [editandoUsuario, setEditandoUsuario] = useState(null);

  // Função para buscar todos os usuários
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://192.168.1.10:3000/api/usuarios');  // Substitua o IP se necessário
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Função para cadastrar um novo usuário
  const cadastrarUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.1.10:3000/api/usuarios', novoUsuario);  // Substitua o IP se necessário
      setNovoUsuario({ nome: '', endereco: '', email: '', telefone: '' });
      fetchUsuarios(); // Atualizar a lista
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  // Função para excluir um usuário
  const excluirUsuario = async (id) => {
    try {
      await axios.delete(`http://192.168.1.10:3000/api/usuarios/${id}`);  // Substitua o IP se necessário
      fetchUsuarios(); // Atualizar a lista
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  // Função para iniciar a edição de um usuário
  const iniciarEdicao = (usuario) => {
    setEditandoUsuario(usuario);
  };

  // Função para salvar alterações no usuário
  const salvarEdicao = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.1.10:3000/api/usuarios/${editandoUsuario._id}`, editandoUsuario);  // Substitua o IP se necessário
      setEditandoUsuario(null); // Limpar estado de edição
      fetchUsuarios(); // Atualizar a lista
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };

  // Carregar os usuários ao montar o componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="usuarios-container">
      <h1>Gerenciamento de Usuários</h1>

      {/* Formulário para cadastrar novo usuário */}
      <form onSubmit={cadastrarUsuario} className="usuarios-form">
        <h2>Cadastrar Novo Usuário</h2>
        <input
          type="text"
          placeholder="Nome"
          value={novoUsuario.nome}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Endereço"
          value={novoUsuario.endereco}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, endereco: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={novoUsuario.email}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={novoUsuario.telefone}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      {/* Lista de usuários */}
      <h2>Lista de Usuários</h2>
      <ul className="usuarios-lista">
        {usuarios.map((usuario) => (
          <li key={usuario._id}>
            {editandoUsuario && editandoUsuario._id === usuario._id ? (
              // Formulário de edição
              <form onSubmit={salvarEdicao}>
                <input
                  type="text"
                  value={editandoUsuario.nome}
                  onChange={(e) => setEditandoUsuario({ ...editandoUsuario, nome: e.target.value })}
                />
                <input
                  type="text"
                  value={editandoUsuario.endereco}
                  onChange={(e) => setEditandoUsuario({ ...editandoUsuario, endereco: e.target.value })}
                />
                <input
                  type="email"
                  value={editandoUsuario.email}
                  onChange={(e) => setEditandoUsuario({ ...editandoUsuario, email: e.target.value })}
                />
                <input
                  type="text"
                  value={editandoUsuario.telefone}
                  onChange={(e) => setEditandoUsuario({ ...editandoUsuario, telefone: e.target.value })}
                />
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setEditandoUsuario(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <span>
                  <strong>ID:</strong> {usuario._id} - <strong>Nome:</strong> {usuario.nome} - <strong>E-mail:</strong> {usuario.email}
                </span>
                <button onClick={() => iniciarEdicao(usuario)}>Editar</button>
                <button onClick={() => excluirUsuario(usuario._id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
