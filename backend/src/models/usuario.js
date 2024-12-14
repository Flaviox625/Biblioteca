const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
