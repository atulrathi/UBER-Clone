const express = require('express');
const router = express.Router();
const confermRide = require('../Controller/confermride');
const { authuser, authmiddleware } = require('../middleware/auth.middleware');

router.post('/conferm',confermRide);

module.exports = router;