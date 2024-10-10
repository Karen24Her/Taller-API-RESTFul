const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' });
    }

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified; // Guardar el usuario verificado en la solicitud
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token no válido' });
    }
};

module.exports = authMiddleware;
