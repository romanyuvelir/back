const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const {sign} = require('../midlewares/sign_ver_jwt_token');

module.exports.register = (req, res) => {
  const {username, password, email} = req.body;

  if(!username || !password || !email) {
    return res.status(400).json({message: 'All lines are necessary'});
  }

  try {
    const existingUser = User.findByUsername(username);
    if(existingUser) {
      return res.status(400).json({message: 'User is already created'});
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const newUser = new User(email, username, hashedPassword);
    newUser.save();

    const payload = {username: newUser.username, email: newUser.email, role: 'user'};
    const token = sign(payload);
    
    res.status(200).json({message: 'User is registered', token});
  } catch(err) {
    res.status(500).json({message: 'Server Error'});
  }
};

module.exports.logins = (req, res) => {
  const {username, password} = req.body;

  if(!username || !password) {
    return res.status(400).json({message: 'All line are necessary'});
  }

  try {
    const user = User.findByUsername(username);
    if(!user) {
      return res.status(400).json({message: 'User not found'});
    }

    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({message: 'Wrong password'});
    }

    const payload = {username: user.username, email: user.email, role: 'user'};
    const token = sign(payload);

    res.status(200).json({token});
  } catch(err) {
    res.status(500).json({message: 'Server Error'})
  }
};