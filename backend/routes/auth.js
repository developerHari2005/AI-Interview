const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   POST api/auth/signup
// @desc    Register a new user
// @access  Public
router.post(
  '/signup',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log('Signup route hit');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    console.log('Request body:', { username, email, password });

    try {
      let user = await User.findOne({ email });
      console.log('User found by email:', user);

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      console.log('User password hashed');

      await user.save();
      console.log('User saved to database');

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.error('JWT sign error:', err);
            throw err;
          }
          console.log('JWT token generated');
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Server error during signup:', err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/auth/google
// @desc    Authenticate with Google
// @access  Public
router.get('/google', (req, res) => {
  res.send('Google OAuth route');
});

// @route   GET api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', (req, res) => {
  res.send('Google OAuth callback route');
});

// @route   GET api/auth/github
// @desc    Authenticate with GitHub
// @access  Public
router.get('/github', (req, res) => {
  res.send('GitHub OAuth route');
});

// @route   GET api/auth/github/callback
// @desc    GitHub OAuth callback
// @access  Public
router.get('/github/callback', (req, res) => {
  res.send('GitHub OAuth callback route');
});

module.exports = router;
