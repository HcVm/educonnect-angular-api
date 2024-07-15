const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagos');

router.post('/', pagoController.registrarPago);

router.get('/', pagoController.obtenerPagos);

router.get('/usuario/:usuarioId', pagoController.obtenerPagosPorUsuario);

module.exports = router;
