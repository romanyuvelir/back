const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { sign } = require('../midlewares/sign_ver_jwt_token');

module.exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'All fields are necessary' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, username, password: hashedPassword });

    const payload = { id: newUser.id, username: newUser.username, email: newUser.email, role: 'user' };
    const token = sign(payload);

    res.status(200).json({ message: 'User registered', id: newUser.id, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports.logins = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are necessary' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const payload = { username: user.username, email: user.email, role: 'user' };
    const token = sign(payload);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
