const { log } = require("console");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const io = new Server(server, {
  cors: { origin: "*" },
});
app.use(cors());
app.get("/user", (req, res) => {
  console.log(req.originalUrl);
  res.status(200).json({ message: "User GET SUCCESS" });
});
io.on("connection", (socket) => {
  console.log("A user Connected", socket.id);
  io.emit("success", "first connection");
  // recive message Event
  socket.on("message", (message) => {
    log(message);
    // emit event to send message to all clients
    io.emit("message", message);
    io.except(socket.id).emit("notify", message);
  });
});
server.listen(5555, () => {
  console.log("listening on *:5555");
});
