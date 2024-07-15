const express = require('express');
const router = express.Router();
const asesorController = require('../controllers/asesores');

router.post('/', asesorController.crearAsesor);

router.get('/:id', asesorController.obtenerAsesorPorId);

router.get('/', asesorController.obtenerAsesores);

router.put('/:id', asesorController.actualizarAsesor);

router.delete('/:id', asesorController.eliminarAsesor);

module.exports = router;
