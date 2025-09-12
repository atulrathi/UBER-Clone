const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema= new mongoose.Schema({
  fullname:{
    Firstname:{
      type:String,
    required:true,
    minlength:[3,"too short name"],
    maxlength:30,
    },
    Lastname:{
      type:String,
    required:true,
    minlength:[3,"too short name"],
    maxlength:30
    }
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    minlength:[8,"too short password"],
    maxlength:1024,
  },
  socketID:{
    type:String,
  },
  date:{
    type:Date,
    default:Date.now
  }
});

userSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"1d"});
  return token;
};
userSchema.methods.comparePassword=async function(password){
  return await bcrypt.compare(password,this.password);
}; 
userSchema.statics.hashPassword=async function(password){
  return await bcrypt.hash(password,10);
};

module.exports=mongoose.model("User",userSchema);