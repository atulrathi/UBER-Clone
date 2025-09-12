const captionmodel=require("../Models/caption");
const captionservice=require("../services/caption.services");
const blacklist = require("../Models/blacklist");
const jwt=require("jsonwebtoken");

module.exports.registercaption=async(req,res)=>{
  const { fullname, email, password } = req.body;
  const captionalreadyexists=await captionmodel.findOne({email});
  if(captionalreadyexists){
    return res.status(400).json({message:"caption already exists"});
  };

  console.log(password,email,fullname);
  const hashedPassword = await captionmodel.hashPassword(password);
  const caption = await captionservice.createcaption({
    fullname:{
      Firstname: fullname.Firstname,
    Lastname: fullname.Lastname,
    },
    email: email, 
    password: hashedPassword,
  });
  const token = caption.generateAuthToken();
  console.log(token);
  console.log(caption);
  res.cookie("token", token);
  res.status(201).json({ message: "caption created successfully", caption, token
  })
}

module.exports.vehicledetails=async(req,res)=>{
  try{
    const { Numberplate,Vehiclecolor,Vehiclemodel,Vehiclecapacity,Vehicletype,token } = req.body;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const captionID=await captionmodel.findOneAndUpdate(
      {_id:decodedToken.id},
      {
        vehicleDetails:{
          numberplate:Numberplate,
          color:Vehiclecolor,
          model:Vehiclemodel,
          capacity:Vehiclecapacity,
          vehicletype:Vehicletype,
        }}
      );
      if(!captionID){
        return res.status(404).json({message:"caption not found"});
      }
      await captionID.save();
      console.log(captionID);
      return res.status(200).json({message:"vehicle details added successfully",captionID});
  }catch(error){
    console.log(error.message);
    return res.status(400).json({message:"invalid token"});
  }
}

module.exports.logincaption=async(req,res)=>{
  const { email, password } = req.body;
  const caption = await captionmodel.findOne({ email }).select("+password");
  if (!caption) {
    console.log("no caption found");
    return res.status(401).json({ message: "invalid email or password" });
  };
  const isMatch = await caption.comparePassword(password);
  if (!isMatch) {
    console.log("password not match");
    return res.status(401).json({ message: "invalid email or password" });
  }; 
  const token = caption.generateAuthToken();
  res.cookie("token", token);
  console.log("login successful");
  res.status(200).json({ message: "login successful", caption, token });
};

module.exports.getcaptionprofile=async(req,res)=>{
  res.status(200).json(req.caption);
}

module.exports.logoutcaption=async (req, res)=>{
  const token=req.cookies.token || req.header.authorization.split(" ")[1];
  await blacklist.create({token});
  res.clearCookie("token");
  res.status(200).json({message:"logout successful"});
} ;