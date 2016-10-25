'use strict';
module.exports = function(sequelize, DataTypes) {
  var Flower = sequelize.define('Flower', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Flower.belongsToMany(models.Bouquet, { through: 'BouquetFlowers' });
      }
    }
  });
  return Flower;
};
