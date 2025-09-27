require("dotenv").config();
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize socket.io with server
initializeSocket(server);

server.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});
