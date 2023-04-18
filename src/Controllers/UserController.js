const userRepository = require('../Repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    
  getAllUsers: async (req, res) => {
    
    const posts = await userRepository.getAllUsers();
    res.send(posts);
  },

  addUser: async (req, res) => {
    const user = req.body;
    const result = await userRepository.addUser(user);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(500).send('Failed to add user');
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await generateToken(user);
    return res.json({ token });
  },
};

async function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const secret = process.env.JWT_SECRET || 'secret';
  const options = { expiresIn: '1h' };
  return await jwt.sign(payload, secret, options);
};