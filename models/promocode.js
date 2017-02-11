'use strict';
module.exports = function(sequelize, DataTypes) {
  var Promocode = sequelize.define('Promocode', {
    description: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Promocode;
};
