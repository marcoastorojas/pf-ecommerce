require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/test-2`, {
const sequelize = new Sequelize(`postgres://kydplhct:NOFBLXCMfN9i7a1e1N373jixRGYszRnR@babar.db.elephantsql.com/kydplhct`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Order, Orderdetail, OrderType, OrderStatus, Sucursal } = sequelize.models;

// Order - OrderDetail - OrderStatus

Order.hasMany(Orderdetail);
Orderdetail.belongsTo(Order);

Sucursal.hasMany(Order);
Order.belongsTo(Sucursal);

OrderStatus.hasMany(Order);
Order.belongsTo(OrderStatus);


const { Category, Subcategory, Product, Price, Role, User, Person, Status, Favorite, Review } = sequelize.models;

User.hasMany(Product, { foreignKey: "userId" })
Product.belongsTo(User, { foreignKey: "userId" })


// Product - Category - Subcategory

Product.hasMany(Orderdetail);
Orderdetail.belongsTo(Product);

Product.hasOne(Price)
Price.belongsTo(Product)

Product.belongsToMany(Category, { through: "category-product" })
Category.belongsToMany(Product, { through: "category-product" })

// User - Person - Rol - Status
Role.hasMany(User, { as: "users" });
User.belongsTo(Role, { as: "role" });

User.hasOne(Person, { foreignKey: "userId", as: "info" });
Person.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Status, { foreignKey: "userId", as: "status" });
Status.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// User - Favorite - Product - Review
User.hasMany(Favorite)
Favorite.belongsTo(User)

Product.hasMany(Favorite)
Favorite.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
