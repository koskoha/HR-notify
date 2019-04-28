const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const crypto = require('crypto');
// const mailer = require('./../../utils/mailer');
const keys = require('../config/keys');
// const { authLimiter } = require('../../middlewares/rateLimit');
const {
  emailexist,
  usernotfound,
  notsuccess,
  success,
  notactive,
  pwdincorrect,
  emailnotfound,
} = require('../validation/errMessages');
// Load Input Validation
const validationRegisterInput = require('../validation/register');
const validationLoginInput = require('../validation/login');

const User = require('../models/user');

const registerUser = async (req, res) => {
  const { errors, isValid } = validationRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    // Validate whether email is existed
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json(emailexist);
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      // avatar,
      password: req.body.password,
      activeToken: '',
      activeExpires: null,
    });

    crypto.randomBytes(20, (err, buf) => {
      // unique token
      newUser.activeToken = req.body.email + buf.toString('hex');
      // expire time is one day
      newUser.activeExpires = Date.now() + 24 * 3600 * 1000;
    });

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (error, hash) => {
        if (error) {
          return res.status(404).json(notsuccess);
        }
        newUser.password = hash;
        const userObject = await newUser.save();
        if (userObject) {
          return res.json(success);
        }
        return res.status(404).json(notsuccess);
      });
    });
  } catch (err) {
    return res.status(404).json(notsuccess);
  }
  return false;
};

const loginUser = async (req, res, next) => {
  const { errors, isValid } = validationLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email } = req.body;
  const { password } = req.body;
  // Find user by email
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(emailnotfound);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // if (!user.active) {
        //   return res.status(404).json(notactive);
        // }
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          isStaff: user.isStaff,
          // avatar: user.avatar,
        }; // Create JWT payload
        // Sign Token
        jwt.sign(
          payload,
          keys.secret,
          {
            // expires in 3 hours
            expiresIn: 10800,
          },
          (err, token) =>
            res.json({
              success: true,
              token: `Bearer ${token}`,
            })
        );
      } else {
        return res.status(404).json(pwdincorrect);
      }
    });
  } catch (err) {
    return res.status(404).json(usernotfound);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
