const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('orderdetail', {

        id_product: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
        },
        
        price: {
            type: DataTypes.DECIMAL,
            defaultValue: DataTypes.DECIMAL,
            allowNull: false,
            primaryKey: false,
        }

    },
    { timestamps: false });
};