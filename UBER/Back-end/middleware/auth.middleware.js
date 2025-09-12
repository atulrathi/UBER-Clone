const usermodel=require("../Models/User-Model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const captionmodel=require("../Models/caption");
const blacklist=require("../Models/blacklist");

module.exports.authuser = async (req, res, next) => {
  try {
    // Get token from cookies or headers
    let token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted. Please login again" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(400).json({ message: "Invalid token" });
  }
};


module.exports.authmiddleware=async (req,res,next)=>{
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
    const caption=await captionmodel.findById(decoded.id);
    req.caption=caption;
    next();
  }catch(err){
    res.status(400).json({message:"Invalid token"});
  }
}