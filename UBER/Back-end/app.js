const express= require("express");
const app = express();
const  dotenv=require("dotenv");
const cors = require("cors");

app.use(cors());
dotenv.config();

app.get("/",(req,res)=>{
  res.send("hello")
})

module.exports=app;