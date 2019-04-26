const express = require('express');

const router = express.Router();

const notificationCtr = require('./controllers/notificationCtr');

router.get('/', notificationCtr.getNotifications);
router.patch('/:id', notificationCtr.markDone);

module.exports = router;
