const knex = require("knex");
const configs = require("../knexfile.js");
const { NODE_ENV } = require("../config/config.js");

module.exports = knex(configs[NODE_ENV]);
