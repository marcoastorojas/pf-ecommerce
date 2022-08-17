require('dotenv').config();

const { Router } = require('express'); 
const { Op } = require("sequelize");
const axios = require('axios');
 
const {Product, Category, SubCategory} = require('../db');
 
 
const router = Router();

router.get('/', async (req, res, next) => { 
 
let recipePromiseDb
recipePromiseDb =  Product.findAll(
  {
    include: SubCategory
  }
)        
.then((respuesta)=>{         
console.log(respuesta)
    recipePromiseDb = respuesta.map(product=>{
          
          return {
            id: product.id,
            SubCategory: product.subcategoryId,
            brand: product.brand,
            model: product.model,
            description: product.description,
            image: product.image
          }  
        
      })
      
       res.status(200).send(recipePromiseDb)
      }) 

      .catch(err=>next(err))

 
})

module.exports = router;