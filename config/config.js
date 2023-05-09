require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "shh";
const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = { JWT_SECRET, NODE_ENV };
