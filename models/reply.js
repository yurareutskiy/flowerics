'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reply = sequelize.define('Reply', {
    reply: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Reply.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Reply;
};
