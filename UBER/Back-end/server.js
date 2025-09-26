const http=require("http");
const app=require("./app");
const {initializeSocket} = require('./socket')
const port=process.env.PORT || 3000 ;

const Server =http.createServer(app);

initializeSocket(Server);


Server.listen(port,()=>{
  console.log(`server is running on ${port}`);
});
