const blacklist = require("../Models/blacklist");
const UserModel = require("../Models/User-Model");
const userservices = require("../services/user.services");
const { validationResult } = require("express-validator");

module.exports.registeruser = async function Createuser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const hashedPassword = await UserModel.hashPassword(password);
  const user = await userservices.createuser({
    Firstname: fullname.Firstname,
    Lastname: fullname.Lastname,
    email: email,
    password: hashedPassword,
  });
  const token = UserModel.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ message: "user created successfully", user, token });
};

module.exports.loginuser = async function loginuser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ message: "login successful", user, token });
};

module.exports.getuserprofile = async function getuserprofile(req, res) {
  res.status(200).json(req.user);
};

module.exports.logoutuser = async (req, res)=>{
  res.clearCookie("token");
  const token=req.cookies.token || req.header.authorization.split(" ")[1];

  await blacklist.create({token});
  res.status(200).json({message:"logout successful"});
} 