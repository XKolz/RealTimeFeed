const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const postViews = {};

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("view_post", (postId) => {
    postViews[postId] = (postViews[postId] || 0) + 1;
    io.emit("post_view_updated", { postId, views: postViews[postId] });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Socket server running on http://localhost:3000");
});
