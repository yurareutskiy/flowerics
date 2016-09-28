'use strict';
module.exports = function(sequelize, DataTypes) {
  var Florist = sequelize.define('Florist', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Florist;
};