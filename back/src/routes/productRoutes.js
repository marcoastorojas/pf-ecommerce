const { Router } = require("express")

//controllers
const {
    postProduct,
    getProducts,
    getProductsByCategoryId,
    getProductsBySubcategoryId,
    getProductById,
    deleteProduct,
    addFavorite,
    addReview,
    deleteFavorite,
    deleteReview,
    updateReview } = require("../controllers/productControllers")

//middlewares
const { validQueryGetProducts } = require("../middlewares/validQueryGetProducts")
const { validIdParam } = require("../middlewares/validIdParam")

const { Product, Category, Subcategory } = require("../db")
const { Op, where } = require("sequelize")
const { validBodyPostProducts } = require("../middlewares/validBodyPostProducts");
const sendmail = require("../helpers/sendEmail");


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


productRoutes.post("/enviaremail", (req, res) => {
    sendmail(
        "majewka22@gmail.com",//email o emails Destino [] o ""
        "Verificacion Email", // asunto del email
        "Presiona para verificar email",
        "<h2>enviar</h2><button>enviar</button>"
    ).then((result) => {
        res.status(200).json({ message: "enviado" })
    }).catch((error) => {
        console.log(error);
    })
})

productRoutes.post("/", validBodyPostProducts, postProduct)

productRoutes.get('/:id', validIdParam, getProductById)



//validando los datos ingresados por el query con un middleware "validQueryGetProducts"
productRoutes.get("/", validQueryGetProducts, getProducts)


productRoutes.get('/category/:id', validIdParam, validQueryGetProducts, getProductsByCategoryId)

//validando los datos ingresados por el query con un middleware "validQueryGetProducts"
productRoutes.get('/subcategory/:id', validIdParam, validQueryGetProducts, getProductsBySubcategoryId)



productRoutes.delete('/:id', validIdParam, deleteProduct)

productRoutes.post('/favorite/:id', validIdParam, addFavorite)
productRoutes.delete('/favorite/:id', validIdParam, deleteFavorite)

productRoutes.post('/review/:id', validIdParam, addReview)
productRoutes.delete('/review/:id', validIdParam, deleteReview)
productRoutes.put('/review/:id', validIdParam, updateReview)

module.exports = {
    productRoutes
}
