const express= require("express");
const app = express();
const  dotenv=require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./Data-Base/MongoDB");
const userRoutes = require("./Router/user.routes");
const cookieParser=require("cookie-parser");

app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/createuser",userRoutes);

module.exports=app;