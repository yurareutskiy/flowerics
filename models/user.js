'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    level: DataTypes.INTEGER,
    points: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Order)
      }
    }
  });
  return User;
};
