const usermodel=require("../Models/User-Model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

module.exports.authuser=async (req,res,next)=>{
  const token=req.cookies.token || req.header.authuserization?.split(" ")[1];
  if(!token){
    return res.status(401).json({message:"Access denied. No token provided"});
  };
  const isblacklisted=await blacklist.findOne({token:token});
  if(isblacklisted){
    return res.status(401).json({message:"Token is blacklisted. Please login again"});
  }
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
  }catch(err){
    res.status(400).json({message:"Invalid token"});
  }
}