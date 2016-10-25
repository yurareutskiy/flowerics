'use strict';
module.exports = function(sequelize, DataTypes) {
  var Mood = sequelize.define('Mood', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Mood.belongsToMany(models.Bouquet, { through: 'BouquetMoods' });
      }
    }
  });
  return Mood;
};
