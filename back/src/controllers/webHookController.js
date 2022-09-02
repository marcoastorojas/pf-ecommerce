const { request, response } = require('express');

const recibeConfirmation = async (req = request, res = response) => {
  const confirmation = req.body
     
  res.status(200).send(confirmation)
  console.log(confirmation)  

};
 
module.exports = {   
  recibeConfirmation   
}
