const pool = require('../config/database');

exports.crearAsesor = async (req, res, next) => {
  const { usuarioId, especializacion, disponibilidad } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO asesores (usuario_id, especializacion, disponibilidad) VALUES (?, ?, ?)',
      [usuarioId, especializacion, disponibilidad]
    );

    res.status(201).json({
      mensaje: 'Asesor creado exitosamente',
      asesorId: result.insertId,
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ mensaje: 'El usuario ya está registrado como asesor' });
    }
    next(error);
  }
};

exports.obtenerAsesorPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT a.*, u.nombre, u.correo 
       FROM asesores a 
       INNER JOIN usuarios u ON a.usuario_id = u.id
       WHERE a.id = ?`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Asesor no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.obtenerAsesores = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, u.nombre, u.correo 
       FROM asesores a 
       INNER JOIN usuarios u ON a.usuario_id = u.id`
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.actualizarAsesor = async (req, res, next) => {
  const { id } = req.params;
  const { especializacion, disponibilidad } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE asesores SET especializacion = ?, disponibilidad = ? WHERE id = ?',
      [especializacion, disponibilidad, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Asesor no encontrado' });
    }
    res.json({ mensaje: 'Asesor actualizado exitosamente' });
  } catch (error) {
    next(error);
  }
};

exports.eliminarAsesor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM asesores WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Asesor no encontrado' });
    }
    res.json({ mensaje: 'Asesor eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};
