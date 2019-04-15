const router = require('express').Router();

const passport = require('passport');
require('../auth/passport')(passport);

const employeeRoutes = require('./employeeRoutes');
const authRoutes = require('./authRoutes');

router.use('/employee', passport.authenticate('jwt', { session: false }), employeeRoutes);
router.use('/auth', authRoutes);

module.exports = router;
