'use strict';

const fs = require('fs');

module.exports = function(sequelize, DataTypes) {
  var Promotion = sequelize.define('Promotion', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    hooks: {
      beforeDestroy: function(promotion) {
        fs.unlink(__dirname +'/../public/uploads/' + promotion.image);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Promotion;
};
