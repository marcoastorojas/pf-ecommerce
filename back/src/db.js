require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pf-ecommerce`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
   Order,
   OrderDetail,
   OrderType
  } = sequelize.models

Order.hasMany(OrderDetail, { as: "orderdetail" })
OrderDetail.belongsTo(Order, { as: "order" })

//Order_detail.hasMany(Product)
//Product.belongsToMany(Order_detail)

Order.hasOne(OrderType)
 

const {
  Category,
  Subcategory,
  Product,
  Role,
  User,
  Person,
  Status } = sequelize.models
// Product - Category - Subcategory

Category.hasMany(Subcategory, { as: "subcategories" })
Subcategory.belongsTo(Category, { as: "category" })

Subcategory.hasMany(Product, { as: "products" })
Product.belongsTo(Subcategory, { as: "subcategory" })

Category.hasMany(Product, { as: "products" })
Product.belongsTo(Category, { as: "category" })

// User - Person - Rol - Status
Role.hasMany(User, { as: "users" })
User.belongsTo(Role, { as: "role" })

User.hasOne(Person, { foreignKey: "userId", as: "info" })
Person.belongsTo(User, { foreignKey: "userId" })

User.hasOne(Status, { foreignKey: "userId", as: "status" })
Status.belongsTo(User, { foreignKey: "userId" })

User.hasMany(Order, {foreignKey: "userId" })
Order.belongsTo(User,{foreignKey: "userId" })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};