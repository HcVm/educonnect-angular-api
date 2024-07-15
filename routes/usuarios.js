const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios');

router.post('/', usuarioController.crearUsuario);

router.get('/:id', usuarioController.obtenerUsuarioPorId);

router.get('/', usuarioController.obtenerUsuarios);

router.put('/:id', usuarioController.actualizarUsuario);

router.delete('/:id', usuarioController.eliminarUsuario);

router.post('/login', usuarioController.iniciarSesion);

module.exports = router;
