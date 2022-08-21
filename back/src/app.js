const express = require("express");
const { routes } = require("./routes")
const cors = require("cors")
const morgan = require('morgan');


const server = express()

server.use(morgan('dev'));
server.use(express.json())
server.use(cors())
server.use("/",routes)

module.exports = server