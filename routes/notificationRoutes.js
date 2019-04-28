const express = require('express');

const router = express.Router();

const notificationCtr = require('../controllers/notificationCtr');

router.get('/', notificationCtr.getUndoneNotifications);
router.patch('/:id/done', notificationCtr.markDone);

module.exports = router;
