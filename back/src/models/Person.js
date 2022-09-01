const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('person', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        dni: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING
        },
        direction: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        street: {
            type: DataTypes.STRING
        },
        zipcode: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
    },
    { timestamps: false });
};