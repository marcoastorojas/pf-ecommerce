const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
<<<<<<< HEAD
          },          
        brand: {
            type: DataTypes.STRING,
            allowNull: true,
=======
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
>>>>>>> 4a168f9225e7a6b36bd8fba1889d1ce041c60a6b
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
<<<<<<< HEAD
        image: {
            type: DataTypes.STRING,
            allowNull: true
=======
        images:{
            type: DataTypes.TEXT,
            allowNull: false,
>>>>>>> 4a168f9225e7a6b36bd8fba1889d1ce041c60a6b
        }
    },
    { timestamps: false }
    );
};