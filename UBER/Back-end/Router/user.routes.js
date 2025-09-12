const express=require("express");
const router=express.Router();
const Createuser = require("../Controller/UserModel");
const { authuser } = require("../middleware/auth.middleware");
const { createuser } = require("../services/user.services");

router.post("/register",Createuser.registeruser);

router.post("/login",Createuser.loginuser);

router.get("/profile",authuser,Createuser.getuserprofile);

router.post("/logout",authuser,Createuser.logoutuser);

module.exports=router;