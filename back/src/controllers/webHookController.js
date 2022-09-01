const { request, response } = require('express');

const recibeConfirmation = async (req = request, res = response) => {
  const confirmation = req.body
   
  console.log(confirmation)  

};
 
module.exports = {   
  recibeConfirmation   
}
