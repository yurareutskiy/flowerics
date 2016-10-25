'use strict';
module.exports = function(sequelize, DataTypes) {
  var BouquetFlowers = sequelize.define('BouquetFlowers', {
    bouquetId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bouquets',
        key: 'id'
      }
    },
    flowerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'flowers',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BouquetFlowers;
};
