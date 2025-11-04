const express = require('express');
const router = express.Router();
const { ridestart } = require('../Controller/ridestart');

router.post('/ride', ridestart);

module.exports = router;
