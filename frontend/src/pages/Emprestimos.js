import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Emprestimos.css';

const Emprestimos = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [livros, setLivros] = useState([]);
  const [livrosMaisEmprestados, setLivrosMaisEmprestados] = useState([]);
  const [novoEmprestimo, setNovoEmprestimo] = useState({
    usuarioId: '',
    livroId: '',
    dataDevolucao: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emprestimosRes, usuariosRes, livrosRes, livrosMaisRes] = await Promise.all([
          axios.get('http://192.168.1.10:3000/api/emprestimos'),
          axios.get('http://192.168.1.10:3000/api/usuarios'),
          axios.get('http://192.168.1.10:3000/api/livros'),
          axios.get('http://192.168.1.10:3000/api/emprestimos/livros-mais-emprestados'),
        ]);

        setEmprestimos(emprestimosRes.data || []);
        setUsuarios(usuariosRes.data || []);
        setLivros(livrosRes.data || []);
        setLivrosMaisEmprestados(livrosMaisRes.data || []);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const registrarEmprestimo = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.1.10:3000/api/emprestimos', novoEmprestimo);
      setNovoEmprestimo({ usuarioId: '', livroId: '', dataDevolucao: '' });
      const updatedEmprestimos = await axios.get('http://192.168.1.10:3000/api/emprestimos');
      setEmprestimos(updatedEmprestimos.data || []);
    } catch (error) {
      console.error('Erro ao registrar empréstimo:', error);
    }
  };

  const finalizarEmprestimo = async (id) => {
    try {
      await axios.put(`http://192.168.1.10:3000/api/emprestimos/${id}`, { devolvido: true });
      const updatedEmprestimos = await axios.get('http://192.168.1.10:3000/api/emprestimos');
      setEmprestimos(updatedEmprestimos.data || []);
    } catch (error) {
      console.error('Erro ao finalizar empréstimo:', error);
    }
  };

  return (
    <div className="emprestimos-container">
      <h1>Gerenciamento de Empréstimos</h1>

      <form onSubmit={registrarEmprestimo} className="emprestimos-form">
        <h2>Registrar Novo Empréstimo</h2>
        <select
          value={novoEmprestimo.usuarioId}
          onChange={(e) => setNovoEmprestimo({ ...novoEmprestimo, usuarioId: e.target.value })}
          required
        >
          <option value="">Selecione o Usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario._id} value={usuario._id}>
              {usuario.nome}
            </option>
          ))}
        </select>
        <select
          value={novoEmprestimo.livroId}
          onChange={(e) => setNovoEmprestimo({ ...novoEmprestimo, livroId: e.target.value })}
          required
        >
          <option value="">Selecione o Livro</option>
          {livros.map((livro) => (
            <option key={livro._id} value={livro._id}>
              {livro.titulo}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={novoEmprestimo.dataDevolucao}
          onChange={(e) => setNovoEmprestimo({ ...novoEmprestimo, dataDevolucao: e.target.value })}
          required
        />
        <button type="submit">Registrar</button>
      </form>

      <h2>Empréstimos Ativos ou Pendentes</h2>
      <ul className="emprestimos-lista">
        {emprestimos.length === 0 ? (
          <p>Nenhum empréstimo ativo no momento.</p>
        ) : (
          emprestimos.map((emprestimo) => (
            <li key={emprestimo._id}>
              <span>
                <strong>Usuário:</strong> {emprestimo.usuario?.nome || 'Desconhecido'} -{' '}
                <strong>Livro:</strong> {emprestimo.livro?.titulo || 'Desconhecido'} -{' '}
                <strong>Data de Devolução:</strong>{' '}
                {emprestimo.dataDevolucao ? new Date(emprestimo.dataDevolucao).toLocaleDateString() : 'Não informado'}
              </span>
              <button onClick={() => finalizarEmprestimo(emprestimo._id)}>Finalizar</button>
            </li>
          ))
        )}
      </ul>

      <h2>Livros Mais Emprestados</h2>
      <ul>
        {livrosMaisEmprestados.length === 0 ? (
          <p>Não há livros mais emprestados no momento.</p>
        ) : (
          livrosMaisEmprestados.map((item, index) => (
            <li key={index}>
              <strong>{item.titulo}</strong> - {item.count} empréstimos
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Emprestimos;
