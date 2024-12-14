const express = require('express');
const router = express.Router();
const {
  getLivros,
  getLivroById,
  addLivro,
  updateLivro,
  deleteLivro,
} = require('../controllers/livroController');

router.get('/', getLivros);
router.get('/:id', getLivroById);
router.post('/', addLivro);
router.put('/:id', updateLivro);
router.delete('/:id', deleteLivro);

module.exports = router;
