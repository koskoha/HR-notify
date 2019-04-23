const express = require('express');

const router = express.Router();

const employeeCtr = require('./controllers/employeeCtr');

router.get('/list', employeeCtr.getAllEmployees);
router.post('/add', employeeCtr.addEmployee);
// router.get('/:id', employeeCtr.getEmployeeById);
router.patch('/:id', employeeCtr.updateEmployee);
router.delete('/:id', employeeCtr.deleteEmployee);
router.get('/notifications', employeeCtr.getNotifications);

module.exports = router;
