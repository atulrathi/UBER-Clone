const captionModel = require("../Models/caption");

// services/caption.services.js
module.exports.createcaption = async ({ fullname, email, password }) => {
  if (!fullname?.Firstname || !fullname?.Lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  const caption = await captionModel.create({
    fullname: { Firstname: fullname.Firstname, Lastname: fullname.Lastname },
    email,
    password,
  });

  return caption;
};

