const express = require('express');
const router = express.Router();
const emprestimoController = require('../controllers/emprestimoController');

// Rota para listar todos os empréstimos
router.get('/', emprestimoController.getAllEmprestimos);

// Rota para adicionar um empréstimo
router.post('/', emprestimoController.addEmprestimo);

// Rota para registrar devolução
router.put('/:id', emprestimoController.registrarDevolucao);

// Relatório: Livros mais emprestados
router.get('/livros-mais-emprestados', emprestimoController.livrosMaisEmprestados);

// Relatório: Usuários com pendências
router.get('/usuarios-com-pendencias', emprestimoController.usuariosComPendencias);

module.exports = router;
