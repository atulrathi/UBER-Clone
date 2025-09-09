const mongoose=require("mongoose");

  mongoose
  .connect(process.env.DB_CONNECT).then(() => {
    console.log("DataBase is connected");
  })
  .catch((err) => {
    console.log(err);
  } );

module.exports = mongoose.connection;