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
        //type: DataTypes.BIGINT(20),
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        createdAt: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: currentDate
          },
          direction: {
            type: DataTypes.STRING
          },
          email: {
            type: DataTypes.STRING
          }
    },    
    { timestamps: false });
};