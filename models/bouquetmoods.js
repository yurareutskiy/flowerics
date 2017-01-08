'use strict';
module.exports = function(sequelize, DataTypes) {
  var BouquetMoods = sequelize.define('BouquetMoods', {
    BouquetId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bouquets',
        key: 'id'
      }
    },
    MoodId: {
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
