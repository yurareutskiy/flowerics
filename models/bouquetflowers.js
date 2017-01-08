'use strict';
module.exports = function(sequelize, DataTypes) {
  var BouquetFlowers = sequelize.define('BouquetFlowers', {
    BouquetId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bouquets',
        key: 'id'
      }
    },
    FlowerId: {
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
