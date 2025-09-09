const express=require("express");
const router=express.Router();
const Createuser = require("../Controller/UserModel");
const {body}=require("express-validator");
const { authuser } = require("../middleware/auth.middleware");
const { createuser } = require("../services/user.services");

router.post("/register",[
  body("fullname.Firstname").isLength({min:3}).withMessage("too short name"),
  body("fullname.Lastname").isLength({min:3}).withMessage("too short name"),
  body("email").isEmail().withMessage("invalid email"),
  body("password").isLength({min:8}).withMessage("too short password"),
],Createuser.registeruser);

router.post("/login",[
  body("email").isEmail().withMessage("invalid email"),
  body("password").isLength({min:8}).withMessage("too short password"),
],Createuser.loginuser);

router.get("/profile",authuser,Createuser.getuserprofile);

router.get("/logout",authuser,Createuser.logoutuser);

module.exports=router;