const UserModel = require("../Models/User-Model");

module.exports.createuser=async ({Firstname,Lastname,email,password})=>{
  if(!Firstname || !Lastname || !email || !password){
    throw new Error("All fields are required");
  };
  const user=UserModel.create({
    fullname:{Firstname:Firstname,
    Lastname:Lastname
  },
  email,
  password
  })
  return user;
}