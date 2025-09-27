const express=require("express");
const router=express.Router();
const {userdata} = require('../Controller/userdata')

router.get('/userdata',userdata);

module.exports=router