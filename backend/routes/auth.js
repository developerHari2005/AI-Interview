const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const auth = require('../middleware/auth');

// @route   POST api/auth/signup
// @desc    Register a new user
// @access  Public
router.post(
  '/signup',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        error: errors.array()[0].msg,
        errors: errors.array()
      });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user already exists by email
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          error: 'User with this email already exists' 
        });
      }

      // Check if username is taken
      existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          error: 'Username is already taken' 
        });
      }

      // Create new user
      const user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Generate token
      const token = generateToken(user.id);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          date: user.date
        }
      });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ 
        success: false,
        error: 'Server error during registration' 
      });
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
      return res.status(400).json({ 
        success: false,
        error: errors.array()[0].msg,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ 
          success: false,
          error: 'Invalid email or password' 
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ 
          success: false,
          error: 'Invalid email or password' 
        });
      }

      // Generate token
      const token = generateToken(user.id);

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          date: user.date
        }
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ 
        success: false,
        error: 'Server error during login' 
      });
    }
  }
);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        date: req.user.date
      }
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server error' 
    });
  }
});

// @route   GET api/auth/google
// @desc    Authenticate with Google
// @access  Public
router.get('/google', (req, res) => {
  res.status(501).json({ 
    success: false,
    error: 'Google OAuth not implemented yet',
    message: 'This feature will be available in a future update'
  });
});

// @route   GET api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', (req, res) => {
  res.status(501).json({ 
    success: false,
    error: 'Google OAuth callback not implemented yet' 
  });
});

// @route   GET api/auth/github
// @desc    Authenticate with GitHub
// @access  Public
router.get('/github', (req, res) => {
  res.status(501).json({ 
    success: false,
    error: 'GitHub OAuth not implemented yet',
    message: 'This feature will be available in a future update'
  });
});

// @route   GET api/auth/github/callback
// @desc    GitHub OAuth callback
// @access  Public
router.get('/github/callback', (req, res) => {
  res.status(501).json({ 
    success: false,
    error: 'GitHub OAuth callback not implemented yet' 
  });
});

module.exports = router;
