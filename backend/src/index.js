require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializa o app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Para suportar dados URL-encoded

// Middleware para log de requisições (ajuda na depuração)
app.use((req, res, next) => {
  console.log(`Recebendo requisição: ${req.method} ${req.url}`);
  console.log('Corpo da requisição:', req.body);
  next();
});

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/livros', require('./routes/livros'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/emprestimos', require('./routes/emprestimos'));

// Middleware para tratar erros de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware para tratar erros gerais
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err.message);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

// Inicializa o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});
