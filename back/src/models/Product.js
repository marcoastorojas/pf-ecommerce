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
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
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
        images:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    { timestamps: false });
};