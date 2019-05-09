const express = require('express');

const router = express.Router();

const contractCtr = require('../controllers/contractCtr');

router.get('/', contractCtr.getContracts);
router.post('/add', contractCtr.addContract);

module.exports = router;
