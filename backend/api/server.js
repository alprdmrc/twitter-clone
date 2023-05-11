const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRouter = require("../api/Users/users-router");
const authRouter = require("./Auth/auth-router");
const tweetsRouter = require("./Tweets/tweets-router");
const followersRouter = require("./Followers/followers-router");
const commentsRouter = require("./Comments/comments-router");

const server = express();
const { restricted } = require("./Auth/auth-middleware");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/tweets", restricted, tweetsRouter);
server.use("/api/followers", restricted, followersRouter);
server.use("/api/comments", restricted, commentsRouter);

server.get("*", (req, res, next) => {
  res.send("<h1>Twitter Clone</h1>");
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
