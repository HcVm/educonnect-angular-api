const express = require('express');
const router = express.Router();
const membresiaController = require('../controllers/membresias');

router.get('/', membresiaController.obtenerMembresias);

router.get('/:id', membresiaController.obtenerMembresiaPorId);

router.post('/', membresiaController.crearMembresia);

router.put('/:id', membresiaController.actualizarMembresia);

router.delete('/:id', membresiaController.eliminarMembresia);

module.exports = router;
