'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phone_number: DataTypes.STRING,
    photo: DataTypes.STRING,
    level: DataTypes.INTEGER,
    points: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Order)
      }
    },
    instanceMethods: {
      fullName: function() {
        return [this.first_name, this.last_name].join(' ');
      }
    }
  });

  return User;
};
