const express = require("express");
const { routes } = require("./routes");
const cors = require("cors");
const server = express();


const morgan = require("morgan");

server.use(express.static("public"))
server.use(morgan("dev"));

server.use(express.json());
server.use(cors());
server.use("/api", routes);

module.exports = server;
