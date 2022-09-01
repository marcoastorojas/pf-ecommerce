const { Router } = require("express")
const webHookRoutes = Router();
 
//controllers
const { recibeConfirmation } = require("../controllers/webHookController")

webHookRoutes.post("/", recibeConfirmation)

module.exports = {
  webHookRoutes
};

 