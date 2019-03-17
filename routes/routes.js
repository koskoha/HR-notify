const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// When the user sends a post request to this route, passport authenticates the user based on the
// middleware created previously
router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.status(200).json({
    message: 'Signup successful',
    user: req.user,
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', { session: false }, async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred');
        return next(error);
      }
      const payload = {
        username: user.username,
        expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
      };
      req.login(payload, { session: false }, async error => {
        if (error) return next(error);
        /** generate a signed json web token and return it in the response */
        const token = jwt.sign(JSON.stringify(payload), 'secret');
        /** assign our jwt to the cookie */
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        // Send back the token to the user
        return res.status(200).json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
