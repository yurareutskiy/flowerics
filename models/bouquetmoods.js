'use strict';
module.exports = function(sequelize, DataTypes) {
  var BouquetMoods = sequelize.define('BouquetMoods', {
    bouquetId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bouquets',
        key: 'id'
      }
    },
    moodId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'moods',
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
  return BouquetMoods;
};
