const express = require('express');

const employeeCtr = require('./controllers/employeeCtr');

const router = express.Router();

router.get('/list', employeeCtr.getAllEmployees);
router.post('/add', employeeCtr.addEmployee);

module.exports = router;
