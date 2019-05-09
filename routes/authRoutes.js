const express = require('express');

const authCtr = require('../controllers/authCtr');

const router = express.Router();

router.post('/register', authCtr.registerUser);
router.post('/login', authCtr.loginUser);

module.exports = router;
