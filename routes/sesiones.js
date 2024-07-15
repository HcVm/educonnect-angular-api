const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesiones');

router.post('/', sesionController.crearSesion);

router.get('/:id', sesionController.obtenerSesionPorId);

router.get('/', sesionController.obtenerSesiones);

router.put('/:id', sesionController.actualizarSesion);

router.delete('/:id', sesionController.eliminarSesion);

module.exports = router;
