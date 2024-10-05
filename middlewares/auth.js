const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');  // El token JWT vendrá en el encabezado Authorization

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);  // Verificar el token sin el prefijo "Bearer"
    req.user = verified;  // Asignar el usuario verificado al objeto req
    next();  // Permitir que la solicitud continúe
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
