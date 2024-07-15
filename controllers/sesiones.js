const pool = require('../config/database');

exports.crearSesion = async (req, res, next) => {
  const { estudianteId, asesorId, fecha, materia } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO sesiones (estudiante_id, asesor_id, fecha, materia) VALUES (?, ?, ?, ?)',
      [estudianteId, asesorId, fecha, materia]
    );
    res.status(201).json({
      mensaje: 'Sesión creada exitosamente',
      sesionId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

exports.obtenerSesionPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT s.*, 
              e.nombre AS nombre_estudiante, e.correo AS correo_estudiante,
              a.usuario_id AS asesor_usuario_id, u.nombre AS nombre_asesor, u.correo AS correo_asesor
       FROM sesiones s
       INNER JOIN usuarios e ON s.estudiante_id = e.id
       INNER JOIN asesores a ON s.asesor_id = a.id
       INNER JOIN usuarios u ON a.usuario_id = u.id
       WHERE s.id = ?`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Sesión no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.obtenerSesiones = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.*, 
              e.nombre AS nombre_estudiante, e.correo AS correo_estudiante,
              a.usuario_id AS asesor_usuario_id, u.nombre AS nombre_asesor, u.correo AS correo_asesor
       FROM sesiones s
       INNER JOIN usuarios e ON s.estudiante_id = e.id
       INNER JOIN asesores a ON s.asesor_id = a.id
       INNER JOIN usuarios u ON a.usuario_id = u.id`
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.actualizarSesion = async (req, res, next) => {
const { fecha, materia, estado } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE sesiones SET fecha = ?, materia = ?, estado = ? WHERE id = ?',
      [fecha, materia, estado, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Sesión no encontrada' });
    }
    res.json({ mensaje: 'Sesión actualizada exitosamente' });
  } catch (error) {
    next(error);
  }
};

exports.eliminarSesion = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query('DELETE FROM sesiones WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Sesión no encontrada' });
      }
  
      res.json({ mensaje: 'Sesión eliminada exitosamente' });
    } catch (error) {
      next(error);
    }
  };
  