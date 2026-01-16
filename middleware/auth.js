const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: "error",
            message: "Token no proporcionado.",
            time: new Date().toISOString(),
            task_id: require('uuid').v4()
        });
    }

    const token = authHeader.substring(7);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Token inválido.",
            time: new Date().toISOString(),
            task_id: require('uuid').v4()
        });
    }
}

module.exports = {
    verifyToken
};