const express = require('express');
const router = express.Router();
const {generateOtp} = require('../Controller/generateotp');

router.post('/getotp', generateOtp);

module.exports = router;
