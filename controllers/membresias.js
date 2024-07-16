const pool = require('../config/database');

exports.obtenerMembresias = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM membresias');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.obtenerMembresiaPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM membresias WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Membresía no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.crearMembresia = async (req, res, next) => {
  const { usuarioId, nombre, descripcion, precio, fechaInicio, fechaFin } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO membresias (usuario_id, nombre, descripcion, precio, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?)',
      [usuarioId, nombre, descripcion, precio, fechaInicio, fechaFin]
    );
    res.status(201).json({
      mensaje: 'Membresía creada exitosamente',
      membresiaId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

exports.actualizarMembresia = async (req, res, next) => {
  const { id } = req.params;
  const { usuarioId, nombre, descripcion, precio, fechaInicio, fechaFin } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE membresias SET usuario_id = ?, nombre = ?, descripcion = ?, precio = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
      [usuarioId, nombre, descripcion, precio, fechaInicio, fechaFin, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Membresía no encontrada' });
    }
    res.json({ mensaje: 'Membresía actualizada exitosamente' });
  } catch (error) {
    next(error);
  }
};


exports.eliminarMembresia = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM membresias WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Membresía no encontrada' });
    }
    res.json({ mensaje: 'Membresía eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
};
