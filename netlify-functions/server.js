const express = require("express");
const serverless = require("serverless-http");
const app = express();

module.exports = app;
module.exports.handler = serverless(app);
