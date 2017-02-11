'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    number: DataTypes.STRING,
    cvv: DataTypes.INTEGER,
    date: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Card;
};
