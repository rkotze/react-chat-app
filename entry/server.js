require("babel-register")({
  presets: ["react", "env", "stage-1"]
});
const express = require("express");
const httpServer = require("http").Server;
const SocketServer = require("./socket-server");

const { start } = require("./react-server");

const app = express();
const http = httpServer(app);
const socketServer = SocketServer(http);

app.use(express.static("public"));

app.get("*", start);

const PORT = 3000;
http.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
