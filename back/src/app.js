const express = require("express");
const { routes } = require("./routes");
const cors = require("cors");
const server = express();
const morgan = require("morgan");

server.use(morgan("dev"));

server.use(express.json());
server.use(cors());
server.use("/", routes);

module.exports = server;
