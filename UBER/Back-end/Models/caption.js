const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const captionSchema=new mongoose.Schema({
  fullname:{
    Firstname:{
      type:String,
    required:true,
    minlength:[3,"too short name"],
    maxlength:30,
    },
    Lastname:{
      type:String,  
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
  date:{
    type:Date,
    default:Date.now
  },
  socketID:{
    type:String,
  },
  status:{
    type:String,
    enum:["active","inactive"],
    default:"inactive"
  },
  vehicleDetails:{
    model:{type:String},
    color:{type:String},
    numberplate:{type:String,unique:true, sparse: true },
    capacity:{type:Number},
    vehicletype:{type:String,enum:["car","bike","van"]}
  },
  location:{
    ltd:{type:Number},
    lng:{type:Number}
  }
});


captionSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"1d"});
  return token;
};

captionSchema.methods.comparePassword=async function(password){
  return await bcrypt.compare(password,this.password);
};
captionSchema.statics.hashPassword=async function(password){
  return await bcrypt.hash(password,10);
}

module.exports=mongoose.model("Caption",captionSchema);