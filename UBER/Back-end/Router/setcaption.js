const express=require("express");
const router=express.Router();
const {captiondata} = require('../Controller/userdata')

router.get('/captiondata',captiondata);

module.exports=router