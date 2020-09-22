const express = require("express");
const app = express();

app.use(require("./news"));

module.exports = app;
