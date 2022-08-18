<<<<<<< HEAD
const express = require("express"); 
const routes = require('./routes/index.js');
require('./db.js');
const server = express() 
server.use('/', routes);
  
=======
const express = require("express");
const { routes } = require("./routes")
const cors = require("cors")
const server = express()
>>>>>>> 4a168f9225e7a6b36bd8fba1889d1ce041c60a6b

server.use(express.json())
server.use(cors())
server.use("/",routes)
module.exports = server
