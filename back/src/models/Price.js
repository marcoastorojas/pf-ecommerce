const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('price',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },

            originalprice: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            discount: {
                type: DataTypes.DOUBLE,
            },
            expiresin: {
                type: DataTypes.DATE,
            }
        },
        { timestamps: false });
};


