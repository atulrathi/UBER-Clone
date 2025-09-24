const express = require("express"); 
const router = express.Router();
const {getDrivingDistance}=require('../Controller/timedistancce')

router.post('/time-distance',getDrivingDistance)

module.exports = router