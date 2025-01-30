require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');

class CustomError {
    constructor(type = "Error", message = "Error", code = 500) {
        this.type = type;
        this.message = message;
        this.code = code;
    }
}

const verify = (token) => {
    return jwt.verify(token, process.env.PUBLIC_JWT_KEY, (error, user) => {
        if (error) {
            throw new CustomError(error.name, error.message, 500);
        }
        if (!user.role) {
            throw new CustomError("Error", "Role is missing in token", 403);
        }
        return user;
    });
}

const sign = (user, response) => {
    try {
        return jwt.sign(user, process.env.SECRET_JWT_KEY, { algorithm: 'RS256', expiresIn: '1h' });
    } catch (error) {
        response.status(500).json({ type: 'JWT Error', msg: "Sign Error" });
    }
}

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new CustomError("Error", "Token is NULL", 401);
        }
        const user = verify(token);
        if (!user) {
            throw new CustomError("Error", "Access denied", 403);
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(error.code).json({ type: error.type, msg: error.message });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ type: 'Forbidden', msg: 'Only administrators can access this route' });
    }
    next();
}
