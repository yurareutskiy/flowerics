'use strict';
module.exports = function(sequelize, DataTypes) {
  var Florist = sequelize.define('Florist', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    card_number: DataTypes.INTEGER,
    social_network_link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Florist;
};
