const pool = require('../config/database');

exports.registrarPago = async (req, res, next) => {
  const { usuarioId, membresiaId, monto, fechaPago, metodoPago } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO pagos (usuario_id, membresia_id, monto, fecha_pago, metodo_pago) VALUES (?, ?, ?, ?, ?)',
      [usuarioId, membresiaId, monto, fechaPago, metodoPago]
    );

    res.status(201).json({
      mensaje: 'Pago registrado y membresía actualizada exitosamente',
      pagoId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

exports.obtenerPagos = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pagos');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.obtenerPagosPorUsuario = async (req, res, next) => {
    const { usuarioId } = req.params;
  
    try {
      const [rows] = await pool.query('SELECT * FROM pagos WHERE usuario_id = ?', [usuarioId]);
      res.json(rows);
    } catch (error) {
      next(error);
    }
  };
  