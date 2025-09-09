const UserModel = require("../Models/User-Model");

module.exports.createuser=async ({firstname,lastname,email,password})=>{
  if(!firstname || !lastname || !email || !password){
    throw new Error("All fields are required");
  };
  const user=usermodel.create({
    fullname:{Firstname:firstname,
    Lastname:lastname
  },
  email,
  password
  })
  return user;
}