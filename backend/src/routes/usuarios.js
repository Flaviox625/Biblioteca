const express = require('express');
const router = express.Router();
const {
  getUsuarios,
  getUsuarioById,
  addUsuario,
  updateUsuario,
  deleteUsuario,
} = require('../controllers/usuarioController');

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', addUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
