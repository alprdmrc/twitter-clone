const express = require("express");
const usersRouter = require("../api/Users/users-router");
const authRouter = require("./Auth/auth-router");
const tweetsRouter = require("./Tweets/tweets-router");
const server = express();
const { restricted } = require("./Auth/auth-middleware");

server.use(express.json());
server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/tweets", restricted, tweetsRouter);

server.get("*", (req, res, next) => {
  res.send("<h1>Twitter Clone</h1>");
});

module.exports = server;
