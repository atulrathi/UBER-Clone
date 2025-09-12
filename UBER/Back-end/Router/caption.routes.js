const express = require("express"); 
const router = express.Router();
const captionController = require("../Controller/caption.controller");
const { authmiddleware } = require("../middleware/auth.middleware");

router.post("/register", captionController.registercaption);

router.post("/Vehicle-info", captionController.vehicledetails);

router.post("/login", captionController.logincaption);

router.get("/profile",authmiddleware, captionController.getcaptionprofile);

router.post("/logout", captionController.logoutcaption);

module.exports = router;