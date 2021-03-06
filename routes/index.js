const router = require('express').Router();

const passport = require('passport');
require('../auth/passport')(passport);

const employeeRoutes = require('./EmployeeRoutes');
const notificationRoutes = require('./notificationRoutes');
const contractRoutes = require('./contractRoutes');
const authRoutes = require('./authRoutes');

router.use('/employee', passport.authenticate('jwt', { session: false }), employeeRoutes);
router.use('/employee/contracts', passport.authenticate('jwt', { session: false }), contractRoutes);
router.use('/employee/notifications', passport.authenticate('jwt', { session: false }), notificationRoutes);
router.use('/auth', authRoutes);

module.exports = router;
