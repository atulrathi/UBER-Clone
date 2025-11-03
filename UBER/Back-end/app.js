const express= require("express");
const app = express();
const  dotenv=require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./Data-Base/MongoDB");
const userRoutes = require("./Router/user.routes");
const captionRoutes = require("./Router/caption.routes");
const cookieParser=require("cookie-parser");
const JWT = require('jsonwebtoken');
const finddistance = require('./Router/finddistance');
const setuser = require('./Router/setuser');
const setcaption = require('./Router/setcaption');
const conferm = require('./Router/conferm');
const getotp = require('./Router/getotp');

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/createuser",userRoutes);
app.use("/caption",captionRoutes);
app.use('/distance',finddistance);
app.use('/setuser',setuser);
app.use('/setcaption',setcaption);
app.use('/ride',conferm);
app.use('/otp',getotp);

module.exports=app;