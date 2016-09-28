'use strict';
module.exports = function(sequelize, DataTypes) {
  var Promotion = sequelize.define('Promotion', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Promotion;
};