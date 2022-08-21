const { Router } = require("express")
//controllers
const {
    postProduct,
    getProducts,
    getProductsByCategoryId,
    getProductsBySubcategoryId,
    getProductById,
    deleteProduct } = require("../controllers/productControllers")

//middlewares
const { validQueryGetProducts } = require("../middlewares/validQueryGetProducts")
const { validIdParam } = require("../middlewares/validIdParam")

const { Product, Category, Subcategory } = require("../db")
const { Op, where } = require("sequelize")
const { validBodyPostProducts } = require("../middlewares/validBodyPostProducts")


const productRoutes = Router()

productRoutes.get("/productsWithCategories", async (req, res) => {
    const title = req.query.title;
    const results = [];

    function conditionalChaining(title) {
        if (title) {
            const promise = Product.findAll({
                where: {
                    title: {
                        [Op.iLike]: "%" + title + "%",
                    },
                },
            });

            if (promise) return promise;
        } else {
            return Product.findAll();
        }
    }

    conditionalChaining(title).then((data) => {
        results.push(data);
        const subcategories = [];

        data.map((product) => {
            if (!subcategories.includes(product.subcategoryId)) {
                subcategories.push(product.subcategoryId);
            }
        });

        Subcategory.findAll({
            attributes: ["categoryId"],
            where: {
                id: subcategories,
            },
        })
            .then((categories) => {
                Category.findAll({
                    attributes: ["id", "name"],
                    where: {
                        id: categories.map((categorie) => categorie.categoryId),
                    },
                })
                    .then((categories) => {
                        results.push(categories);
                        res.send(results);
                    });
            });
    });
});

productRoutes.post("/", validBodyPostProducts, postProduct)

productRoutes.get('/:id', validIdParam, getProductById)



//validando los datos ingresados por el query con un middleware "validQueryGetProducts"
productRoutes.get("/", validQueryGetProducts, getProducts)


//validando los datos ingresados por el query con un middleware "validQueryGetProducts" 
//Get products by categoryId
//Query 
productRoutes.get('/category/:idCategory', async (req, res) => {
    let products
    const categoryId = req.params.idCategory;
    const subCategory = await Subcategory.findAll({ where: { categoryId: categoryId } })

    subCategory.length ?
        (
            products = await Product.findAll({ where: { subcategoryId: subCategory[0].id } }),
            res.send(products)
        )

        : res.send('No hay resultados.')

})


productRoutes.get('/category/:id', validIdParam, validQueryGetProducts, getProductsByCategoryId)

//validando los datos ingresados por el query con un middleware "validQueryGetProducts"
productRoutes.get('/subcategory/:id', validIdParam, validQueryGetProducts, getProductsBySubcategoryId)

productRoutes.delete('/:id', validIdParam, deleteProduct)

module.exports = {
    productRoutes
}
