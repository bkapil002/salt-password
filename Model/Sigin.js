const UserModel = require('./UserModel');
const bcrypt = require('bcrypt');

async function sigincontroller(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error('Please provide name, email, and password');
    }

    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email is already registered', error: true });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashPassword
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User registered successfully"
    });
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({
      message: err.message || 'Failed to sign up',
      error: true,
      success: false
    });
  }
}

module.exports = sigincontroller;
