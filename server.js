const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const pool = require('./config/database');

app.use(cors());
app.use(express.json());

const usuarioRoutes = require('./routes/usuarios');
const asesorRoutes = require('./routes/asesores');
const membresiaRoutes = require('./routes/membresias');
const sesionRoutes = require('./routes/sesiones');
const pagoRoutes = require('./routes/pagos');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/asesores', asesorRoutes);
app.use('/api/membresias', membresiaRoutes);
app.use('/api/sesiones', sesionRoutes);
app.use('/api/pagos', pagoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
