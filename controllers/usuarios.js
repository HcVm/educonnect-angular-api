const pool = require('../config/database');
const bcrypt = require('bcrypt');

exports.crearUsuario = async (req, res, next) => {
  const { nombre, correo, contraseña, tipo } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña, tipo) VALUES (?, ?, ?, ?)',
      [nombre, correo, hashedPassword, tipo]
    );

    console.log("Usuario creado con éxito:", result.insertId); // Log después de crear
    res.status(201).json({ 
      mensaje: 'Usuario creado exitosamente',
      usuarioId: result.insertId 
    });
  } catch (error) {

    console.error("Error al crear usuario:", error); // Log del error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ mensaje: 'El correo electrónico ya está registrado' });
    }
    next(error);
  }
};

exports.obtenerUsuarioPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.obtenerUsuarios = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.actualizarUsuario = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, correo, tipo } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE usuarios SET nombre = ?, correo = ?, tipo = ? WHERE id = ?',
      [nombre, correo, tipo, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (error) {
    next(error);
  }
};

exports.eliminarUsuario = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};

exports.iniciarSesion = async (req, res, next) => {
  const { correo, contraseña } = req.body;

  try {
    console.log("Intentando iniciar sesión con correo:", correo); // Log antes de la consulta

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

    if (rows.length === 0) {
      console.warn("Credenciales inválidas: Usuario no encontrado para el correo:", correo); // Log de advertencia
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const usuario = rows[0];

    console.log("Verificando contraseña para usuario:", usuario.id); // Log antes de verificar la contraseña

    const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!validPassword) {
      console.warn("Credenciales inválidas: Contraseña incorrecta para el usuario:", usuario.id); // Log de advertencia
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    console.log("Inicio de sesión exitoso para usuario:", usuario.id); // Log de éxito

    res.json({ mensaje: 'Inicio de sesión exitoso', usuario }); 
  } catch (error) {
    console.error("Error al iniciar sesión:", error); // Log del error
    next(error);
  }
};