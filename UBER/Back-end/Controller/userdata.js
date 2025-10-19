const usermodel = require('../Models/User-Model');
const captionmodel=require('../Models/caption')
const jwt = require('jsonwebtoken');

module.exports.userdata = async (req, res) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Fetch user (exclude sensitive fields)
    const userdata = await usermodel.findOne({_id:decoded.id})

    if (!userdata) {
        console.log('no user')
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(userdata);

  } catch (err) {
    console.error("❌ JWT error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports.captiondata = async (req, res) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Fetch user (exclude sensitive fields)
    const caption = await captionmodel.findOne({_id:decoded.id})

    if (!caption) {
        console.log('no user')
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(caption);

  } catch (err) {
    console.error("❌ JWT error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
