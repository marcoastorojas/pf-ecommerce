const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1 ),
      date.getFullYear(),
    ].join('-');
  }
  currentDate = formatDate(new Date()).toString()
   

    sequelize.define('order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        createdAt: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: currentDate
          }    
    },    
    { timestamps: false });
};