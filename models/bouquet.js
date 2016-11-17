'use strict';

const fs = require('fs');

module.exports = function(sequelize, DataTypes) {
  var Bouquet = sequelize.define('Bouquet', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    prescription: DataTypes.STRING,
    icon: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    hooks: {
      beforeDestroy: function(bouquet) {
        for(i = 0; i < bouquet.images.length; i++) {
          fs.unlink(__dirname +'/../public/uploads/' + bouquet.images[i]);
        }
        fs.unlink(__dirname +'/../public/uploads/' + bouquet.icon);
      }
    },
    classMethods: {
      associate: function(models) {
        Bouquet.belongsToMany(models.Flower, { through: 'BouquetFlowers' });
        Bouquet.belongsToMany(models.Mood, { through: 'BouquetMoods' });
        Bouquet.hasMany(models.Order);
      }
    }
  });
  return Bouquet;
};
