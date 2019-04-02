const passport = require('passport');
const express = require('express');
const Authentication = require('../auth/auth');

const router = express.Router();

const requireSignin = passport.authenticate('local', { session: false });

router.post('/signin', requireSignin, Authentication.signin);
router.post('/signup', Authentication.signup);

module.exports = router;
