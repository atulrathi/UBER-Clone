const blacklist = require("../Models/blacklist");
const UserModel = require("../Models/User-Model");
const userservices = require("../services/user.services");

module.exports.registeruser = async function Createuser(req, res) {
  const { fullname, email, password } = req.body;
  const useralreadyexists = await UserModel.findOne({ email });
  if (useralreadyexists) {
    return res.status(400).json({ message: "user already exists" });
  };
  const hashedPassword = await UserModel.hashPassword(password);
  const user = await userservices.createuser({
    Firstname: fullname.Firstname,
    Lastname: fullname.Lastname,
    email: email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ message: "user created successfully", user, token });
};

module.exports.loginuser = async function loginuser(req, res) {
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

module.exports.logoutuser = async (req, res) => {
  try {
    let token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Save token to blacklist only if not already there
    await blacklist.findOneAndUpdate(
      { token },
      { token },
      { upsert: true, new: true }
    );

    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong during logout" });
  }
};

