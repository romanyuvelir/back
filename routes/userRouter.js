const express = require('express');
const userController = require('../controllers/userController');
const {authenticate} = require('../midlewares/sign_ver_jwt_token');

const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.logins);
router.post('/api/resource', authenticate, (req, res) => {
    const {data} = req.body;
    if(!data) {
        return res.status(400).json({err: 'Data is required'});
    }
    res.status(200).json({message: 'Resource created', data});
});

router.put('/api/resource/:id', authenticate, (req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    if(!data) {
        return res.status(400).json({err: 'Data is required'});
    }

    res.status(200).json({message: `Resource with ID ${id} updated`, data});
});

router.get('/api/resources/:id', authenticate, (req, res) => {
    const {id} = req.params;
    res.status(200).json({message: `Resource with ID ${id} found`, data: {id, email: 'Example Resource'}});
});

router.get('/api/user', authenticate, (req, res) => {
    res.status(200).json({user: req.user});
});

module.exports = router;