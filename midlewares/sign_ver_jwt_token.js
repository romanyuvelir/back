require('dotenv').config();
const { response } = require('express');
const jwt = require('jsonwebtoken');

class CustomError {
    constructor(type = 'Error', message = 'Error', code = 500){
        this.type = type;
        this.message = message;
        this.code = code;
    }
}

const verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.PUBLIC_JWT_KEY, (error, user) => {
            if(err) {
                return reject(new CustomError(err.name, error.message, 500));
            }
            if(user.admin === undefined) {
                return reject(new CustomError('Error', 'The admin field doesn`t exist', 500));
            }
            resolve(user.admin);
        });
    });
};

module.exports.sign = (res) => {
    try {
        return jwt.sign({admin:true}, process.env.SECRET_JWT_KEY,{algorithm: 'RS256', expiresIn: '1h'});
    } catch(err) {
        res.status(500).json({type: 'JWT Error', message: "Sign Error"});
    }
}

module.exports.authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token) {
            throw new CustomError("Error", "Token is NULL", 400);
        }

        const result = verify(token);
        if(!result) {
            throw new CustomError("Error", "Access denied", 400);
        }

        next();
    } catch(err) {
        res.status(err.code).json({type: err.type, msg: err.message});
    }
}