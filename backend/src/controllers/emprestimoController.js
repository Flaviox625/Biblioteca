// Registrar um empréstimo
exports.addEmprestimo = async (req, res) => {
  try {
    const { usuarioId, livroId, dataDevolucao } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const livro = await Livro.findById(livroId);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

    const emprestimo = new Emprestimo({
      usuario: usuarioId,
      livro: livroId,
      dataDevolucao,
    });

    await emprestimo.save();
    res.status(201).json(emprestimo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getAllEmprestimos = async (req, res) => {
  try {
    const emprestimos = await Emprestimo.find()
      .populate('usuario', 'nome') // Popula apenas o nome do usuário
      .populate('livro', 'titulo'); // Popula apenas o título do livro
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar empréstimos', error });
  }
};

// Registrar devolução
exports.registrarDevolucao = async (req, res) => {
  try {
    const emprestimo = await Emprestimo.findByIdAndUpdate(
      req.params.id,
      { devolvido: true },
      { new: true }
    );

    if (!emprestimo)
      return res.status(404).json({ error: 'Empréstimo não encontrado' });

    res.json(emprestimo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Relatório: Livros mais emprestados
exports.livrosMaisEmprestados = async (req, res) => {
  try {
    const relatorio = await Emprestimo.aggregate([
      { $group: { _id: '$livro', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json(relatorio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Relatório: Usuários com Empréstimos Pendentes
exports.usuariosComPendencias = async (req, res) => {
  try {
    const pendencias = await Emprestimo.find({ devolvido: false })
      .populate('usuario', 'nome email telefone') // Dados do usuário
      .populate('livro', 'titulo'); // Dados do livro

    res.status(200).json(pendencias);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar relatório de usuários com pendências', details: err.message });
  }
};

const Emprestimo = require('../models/emprestimo');
const Livro = require('../models/livro');
const Usuario = require('../models/usuario');

// Registrar um empréstimo
exports.addEmprestimo = async (req, res) => {
  try {
    const { usuarioId, livroId, dataDevolucao } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const livro = await Livro.findById(livroId);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

    const emprestimo = new Emprestimo({
      usuario: usuarioId,
      livro: livroId,
      dataDevolucao,
    });

    await emprestimo.save();
    res.status(201).json(emprestimo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os empréstimos
exports.getAllEmprestimos = async (req, res) => {
  try {
    const emprestimos = await Emprestimo.find({ devolvido: false })
      .populate('usuario', 'nome') // Popula apenas o nome do usuário
      .populate('livro', 'titulo'); // Popula apenas o título do livro
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar empréstimos', error });
  }
};

// Registrar devolução
exports.registrarDevolucao = async (req, res) => {
  try {
    const emprestimo = await Emprestimo.findByIdAndUpdate(
      req.params.id,
      { devolvido: true },
      { new: true }
    );

    if (!emprestimo)
      return res.status(404).json({ error: 'Empréstimo não encontrado' });

    res.json(emprestimo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Relatório: Livros mais emprestados
exports.livrosMaisEmprestados = async (req, res) => {
  try {
    const relatorio = await Emprestimo.aggregate([
      { $group: { _id: '$livro', count: { $sum: 1 } } },
      { $lookup: { from: 'livros', localField: '_id', foreignField: '_id', as: 'livro' } },
      { $unwind: '$livro' },
      { $project: { titulo: '$livro.titulo', count: 1 } }, // Inclui o título no retorno
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.status(200).json(relatorio);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar relatório', error });
  }
};

