const Livro = require('../models/livro');

// Obter todos os livros
exports.getLivros = async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter um único livro por ID
exports.getLivroById = async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar um novo livro
exports.addLivro = async (req, res) => {
  try {
    const livro = new Livro(req.body);
    await livro.save();
    res.status(201).json(livro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um livro
exports.updateLivro = async (req, res) => {
  try {
    const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(livro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Excluir um livro
exports.deleteLivro = async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json({ message: 'Livro excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
