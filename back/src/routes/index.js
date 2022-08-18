const { Router } = require('express');
const router = Router();
const rutaProducts = require('./rutaProducts');
 
router.use('/products', rutaProducts);
 

module.exports = router;